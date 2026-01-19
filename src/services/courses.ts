import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"

import { db, storage } from "@/lib/firebase"

export type CourseData = {
  title: string
  description?: string | null
  createdAt?: unknown
  updatedAt?: unknown
}

export type Course = CourseData & { id: string }

export type CourseModuleData = {
  title: string
  notes: string
  videoUrl?: string | null
  videoPath?: string | null
  order?: number
  createdAt?: unknown
  updatedAt?: unknown
}

export type CourseModule = CourseModuleData & { id: string }

export async function fetchCourses(): Promise<Course[]> {
  const snap = await getDocs(query(collection(db, "courses"), orderBy("createdAt", "desc")))
  return snap.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as CourseData),
  }))
}

export async function fetchCourseModules(courseId: string): Promise<CourseModule[]> {
  const snap = await getDocs(
    query(collection(db, "courses", courseId, "modules"), orderBy("order", "asc"))
  )
  return snap.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as CourseModuleData),
  }))
}

export async function createCourse(input: { title: string; description?: string }) {
  const data: CourseData = {
    title: input.title,
    description: input.description?.trim() || "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  const docRef = await addDoc(collection(db, "courses"), data)
  return docRef.id
}

export async function updateCourse(courseId: string, input: { title: string; description?: string }) {
  await setDoc(
    doc(db, "courses", courseId),
    {
      title: input.title,
      description: input.description?.trim() || "",
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}

async function uploadModuleVideo(courseId: string, moduleId: string, file: File) {
  const extension = file.name.split(".").pop() || "mp4"
  const path = `courses/${courseId}/modules/${moduleId}_${Date.now()}.${extension}`
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, file)
  const videoUrl = await getDownloadURL(storageRef)
  return { videoUrl, videoPath: path }
}

export async function createCourseModule(input: {
  courseId: string
  title: string
  notes: string
  videoFile?: File | null
}) {
  const moduleRef = doc(collection(db, "courses", input.courseId, "modules"))
  const baseData: CourseModuleData = {
    title: input.title,
    notes: input.notes,
    order: Date.now(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  if (input.videoFile) {
    const upload = await uploadModuleVideo(input.courseId, moduleRef.id, input.videoFile)
    baseData.videoUrl = upload.videoUrl
    baseData.videoPath = upload.videoPath
  }

  await setDoc(moduleRef, baseData)
  return moduleRef.id
}

export async function updateCourseModule(input: {
  courseId: string
  moduleId: string
  title: string
  notes: string
  videoFile?: File | null
  previousVideoPath?: string | null
}) {
  const updates: CourseModuleData = {
    title: input.title,
    notes: input.notes,
    updatedAt: serverTimestamp(),
  }

  if (input.videoFile) {
    const upload = await uploadModuleVideo(input.courseId, input.moduleId, input.videoFile)
    updates.videoUrl = upload.videoUrl
    updates.videoPath = upload.videoPath
  }

  await setDoc(doc(db, "courses", input.courseId, "modules", input.moduleId), updates, {
    merge: true,
  })

  if (input.videoFile && input.previousVideoPath) {
    await deleteObject(ref(storage, input.previousVideoPath)).catch(() => {})
  }
}

export async function deleteCourseModule(input: {
  courseId: string
  moduleId: string
  videoPath?: string | null
}) {
  await deleteDoc(doc(db, "courses", input.courseId, "modules", input.moduleId))
  if (input.videoPath) {
    await deleteObject(ref(storage, input.videoPath)).catch(() => {})
  }
}

export async function deleteCourse(courseId: string) {
  const modulesSnap = await getDocs(collection(db, "courses", courseId, "modules"))
  await Promise.allSettled(
    modulesSnap.docs.map(async (docSnap) => {
      const data = docSnap.data() as CourseModuleData
      await deleteDoc(doc(db, "courses", courseId, "modules", docSnap.id))
      if (data.videoPath) {
        await deleteObject(ref(storage, data.videoPath)).catch(() => {})
      }
    })
  )
  await deleteDoc(doc(db, "courses", courseId))
}
