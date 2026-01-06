import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  getAdditionalUserInfo,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
  User
} from "firebase/auth"
import { app, storage } from "@/lib/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const appleProvider = new OAuthProvider("apple.com")
appleProvider.addScope("email")
appleProvider.addScope("name")

function getErrorCode(error: unknown) {
  if (error && typeof error === "object" && "code" in error && typeof (error as { code: unknown }).code === "string") {
    return (error as { code: string }).code
  }
  if (error instanceof Error) {
    return error.message
  }
  return "Unknown error"
}

/**
 * Verifica se o email está na whitelist via API (servidor)
 */
export async function isEmailAllowed(email: string): Promise<boolean> {
  if (!email) return false
  
  try {
    const response = await fetch('/api/check-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })

    if (!response.ok) {
      return true
    }

    const contentType = response.headers.get("content-type") || ""
    if (!contentType.includes("application/json")) {
      return true
    }

    const data = await response.json()
    return data.allowed === true
  } catch (error) {
    console.error('Erro ao verificar email:', error)
    return true
  }
}

/**
 * Login com email e senha
 */
export async function signInWithEmail(email: string, password: string) {
  try {
    // Verifica se o email está autorizado
    const allowed = await isEmailAllowed(email)
    if (!allowed) {
      return { user: null, error: "Email não autorizado. Acesso restrito." }
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error) {
    console.error("Error signing in with email:", error)
    return { user: null, error: getErrorCode(error) }
  }
}

/**
 * Cadastro com email e senha
 */
export async function signUpWithEmail(email: string, password: string) {
  try {
    const allowed = await isEmailAllowed(email)
    if (!allowed) {
      return { user: null, error: "Email nao autorizado. Acesso restrito." }
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error) {
    console.error("Error signing up with email:", error)
    return { user: null, error: getErrorCode(error) }
  }
}

/**
 * Login com Google
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    // Verifica se o email está autorizado
    const allowed = await isEmailAllowed(user.email || "")
    if (!allowed) {
      // Se não está autorizado, deleta a conta e faz logout
      try {
        await deleteUser(user)
        console.log("Conta não autorizada deletada:", user.email)
      } catch (deleteError) {
        console.error("Erro ao deletar conta não autorizada:", deleteError)
        // Se falhar ao deletar, pelo menos faz logout
        await firebaseSignOut(auth)
      }
      return { user: null, error: "Email não autorizado. Acesso restrito." }
    }

    return { user, error: null }
  } catch (error) {
    console.error("Error signing in with Google:", error)
    return { user: null, error: getErrorCode(error) }
  }
}

/**
 * Login com Apple
 */
export async function signInWithApple() {
  try {
    const result = await signInWithPopup(auth, appleProvider)
    const user = result.user

    // Tenta capturar nome no primeiro login (a Apple só envia uma vez)
    const additionalInfo = getAdditionalUserInfo(result)
    const profile = additionalInfo?.profile as
      | { name?: { firstName?: string; lastName?: string } }
      | undefined
    const fullName = profile?.name
    const emailLocal = (user.email || "").split("@")[0] || ""
    const derivedName = [fullName?.firstName, fullName?.lastName].filter(Boolean).join(" ").trim()
    const desiredName = derivedName || user.displayName || emailLocal || "WeDancer"

    try {
      if (desiredName) {
        await updateProfile(user, { displayName: desiredName })
      }
    } catch (profileError) {
      console.error("Não foi possível salvar o nome do Apple:", profileError)
    }

    const allowed = await isEmailAllowed(user.email || "")
    if (!allowed) {
      try {
        await deleteUser(user)
        console.log("Conta não autorizada deletada:", user.email)
      } catch (deleteError) {
        console.error("Erro ao deletar conta não autorizada:", deleteError)
        await firebaseSignOut(auth)
      }
      return { user: null, error: "Email não autorizado. Acesso restrito." }
    }

    return { user, error: null }
  } catch (error) {
    console.error("Error signing in with Apple:", error)
    return { user: null, error: getErrorCode(error) }
  }
}

/**
 * Logout
 */
export async function signOut() {
  try {
    await firebaseSignOut(auth)
    return { error: null }
  } catch (error) {
    console.error("Error signing out:", error)
    return { error: error instanceof Error ? error.message : "Unknown error" }
  }
}

/**
 * Observer de autenticação
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}

/**
 * Pega o usuário atual
 */
export function getCurrentUser() {
  return auth.currentUser
}

/**
 * Envia email de reset de senha
 */
export async function resetPassword(email: string) {
  try {
    // Verifica se o email está autorizado
    const allowed = await isEmailAllowed(email)
    if (!allowed) {
      return { error: "Email não autorizado. Acesso restrito." }
    }

    await sendPasswordResetEmail(auth, email)
    return { error: null }
  } catch (error) {
    console.error("Error sending password reset email:", error)
    return { error: error instanceof Error ? error.message : "Unknown error" }
  }
}

/**
 * Alterar senha do usuário
 */
export async function changePassword(currentPassword: string, newPassword: string) {
  try {
    const user = auth.currentUser
    if (!user || !user.email) {
      throw new Error("Usuário não autenticado")
    }

    // Reautentica o usuário antes de mudar a senha
    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)

    // Atualiza a senha
    await updatePassword(user, newPassword)
    return { error: null }
  } catch (error) {
    console.error("Error changing password:", error)
    let errorMessage = "Erro ao alterar senha"
    
    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as { code: string }
      if (firebaseError.code === "auth/wrong-password") {
        errorMessage = "Senha atual incorreta"
      } else if (firebaseError.code === "auth/weak-password") {
        errorMessage = "A nova senha é muito fraca. Use pelo menos 6 caracteres"
      } else if (firebaseError.code === "auth/requires-recent-login") {
        errorMessage = "Por segurança, faça login novamente antes de alterar a senha"
      }
    }
    
    return { error: errorMessage }
  }
}

/**
 * Atualizar foto do perfil
 */
export async function updateUserPhoto(file: File) {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error("Usuário não autenticado")
    }

    // Cria referência para o storage
    const timestamp = Date.now()
    const fileName = `${user.uid}_${timestamp}.${file.name.split('.').pop()}`
    const storageRef = ref(storage, `users/${user.uid}/${fileName}`)

    // Upload da foto
    await uploadBytes(storageRef, file)
    const photoURL = await getDownloadURL(storageRef)

    // Atualiza o perfil
    await updateProfile(user, { photoURL })
    
    return { photoURL, error: null }
  } catch (error) {
    console.error("Error updating user photo:", error)
    return { photoURL: null, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

/**
 * Atualizar nome do perfil
 */
export async function updateUserName(displayName: string) {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error("Usuário não autenticado")
    }

    await updateProfile(user, { displayName })
    return { error: null }
  } catch (error) {
    console.error("Error updating user name:", error)
    return { error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export { auth }
