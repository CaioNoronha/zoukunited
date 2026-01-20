import { type User, updateProfile } from "firebase/auth"
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"

import { auth, signOut } from "@/services/auth"
import { db, storage } from "@/lib/firebase"
import { isAdminEmail } from "@/lib/admins"

export type UserProfileData = {
  firstName: string
  lastName: string
  city: string
  country: string
  phone: string
  categories: string[]
  photoURL?: string
  displayName?: string
  email?: string | null
  isAdmin?: boolean
}

function buildDisplayName(firstName: string, lastName: string) {
  return [firstName, lastName].filter(Boolean).join(" ").trim()
}

export async function fetchUserProfile(uid: string): Promise<UserProfileData | null> {
  const userDoc = await getDoc(doc(db, "users", uid))
  if (!userDoc.exists()) return null

  const data = userDoc.data() as Partial<UserProfileData>
  return {
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    city: data.city || "",
    country: data.country || "",
    phone: data.phone || "",
    categories: data.categories || [],
    photoURL: data.photoURL,
    displayName: data.displayName,
    email: data.email,
    isAdmin: Boolean(data.isAdmin),
  }
}

export async function ensureUserProfile(user: User) {
  const userRef = doc(db, "users", user.uid)
  const userDoc = await getDoc(userRef)

  if (userDoc.exists()) {
    const data = userDoc.data() as Partial<UserProfileData>
    const nextIsAdmin = isAdminEmail(user.email)
    if (data.isAdmin !== nextIsAdmin) {
      await setDoc(
        userRef,
        { isAdmin: nextIsAdmin, updatedAt: serverTimestamp() },
        { merge: true }
      )
    }
    return
  }

  const displayName = user.displayName || ""
  const [firstName, ...rest] = displayName.split(" ").filter(Boolean)
  const lastName = rest.join(" ").trim()

  await setDoc(
    userRef,
    {
      firstName: firstName || "",
      lastName,
      city: "",
      country: "",
      phone: "",
      categories: [],
      photoURL: user.photoURL ?? null,
      displayName,
      email: user.email ?? null,
      isAdmin: isAdminEmail(user.email),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}

export async function saveUserProfile(input: {
  firstName: string
  lastName: string
  phone: string
  city: string
  country: string
  categories: string[]
  photoFile?: File
  removePhoto?: boolean
  previousPhotoURL?: string | null
}) {
  const user = auth.currentUser
  if (!user) {
    throw new Error("Usuário não autenticado")
  }

  const cleanedCategories = Array.from(new Set(input.categories)).filter(Boolean)
  let photoURL = input.removePhoto ? null : user.photoURL || null

  if (input.photoFile) {
    const extension = input.photoFile.name.split(".").pop() || "jpg"
    const storageRef = ref(storage, `users/${user.uid}/profile_${Date.now()}.${extension}`)
    await uploadBytes(storageRef, input.photoFile)
    photoURL = await getDownloadURL(storageRef)
  }

  // remove foto anterior se necessário
  if ((input.photoFile || input.removePhoto) && input.previousPhotoURL) {
    try {
      await deleteObject(ref(storage, input.previousPhotoURL))
    } catch {
      // ignora erros de deleção
    }
  }

  const displayName = buildDisplayName(input.firstName, input.lastName)

  await Promise.all([
    updateProfile(user, { displayName: displayName || undefined, photoURL }),
    setDoc(
      doc(db, "users", user.uid),
      {
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        city: input.city,
        country: input.country,
        categories: cleanedCategories,
        photoURL: photoURL ?? null,
        displayName,
        email: user.email,
        isAdmin: isAdminEmail(user.email),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    ),
  ])

  return { displayName, photoURL: photoURL ?? null }
}

export async function deleteUserAccount() {
  const user = auth.currentUser
  if (!user) throw new Error("Usuário não autenticado")

  // remove eventos e cards de propriedade do usuário
  const eventsSnap = await getDocs(query(collection(db, "events"), where("ownerId", "==", user.uid)))
  await Promise.allSettled(
    eventsSnap.docs.map(async (docSnap) => {
      const id = docSnap.id
      await Promise.allSettled([
        deleteDoc(doc(db, "events", id)),
        deleteDoc(doc(db, "eventCards", id)).catch(() => {}),
        deleteDoc(doc(db, "users", user.uid, "events", id)).catch(() => {}),
      ])
    })
  )

  await Promise.allSettled([
    deleteDoc(doc(db, "users", user.uid, "professional", "producer")),
    deleteDoc(doc(db, "users", user.uid, "professional", "teacher")),
    deleteDoc(doc(db, "users", user.uid, "professional", "dj")),
  ])

  await deleteDoc(doc(db, "users", user.uid))
  await signOut()
}
