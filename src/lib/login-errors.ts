type LoginErrorCode = string

const validationMessages = {
  missingCredentials: "Please enter email and password",
  invalidEmail: "Please enter a valid email address",
}

const firebaseErrorMessages: Record<LoginErrorCode, string> = {
  "auth/invalid-email": "The email address is invalid",
  "auth/user-disabled": "This account has been disabled",
  "auth/user-not-found": "No account found with these credentials",
  "auth/wrong-password": "Incorrect email or password",
  "auth/too-many-requests": "Too many attempts. Please try again later",
  "auth/popup-closed-by-user": "Login was cancelled before completing",
  "auth/cancelled-popup-request": "Login was cancelled before completing",
  "auth/popup-blocked": "Popup was blocked. Please allow popups and try again",
  "auth/account-exists-with-different-credential": "This email is linked to a different provider. Try another login method",
  "auth/credential-already-in-use": "This credential is already associated with another account",
  "auth/email-already-in-use": "This email is already associated with another account",
  "auth/weak-password": "Password should be at least 6 characters",
  "auth/invalid-password": "Password should be at least 6 characters",
}

const fallbackError =
  "We couldn't sign you in. Please check your details and try again"

export function getValidationMessage(type: keyof typeof validationMessages) {
  return validationMessages[type]
}

export function getFirebaseLoginMessage(code?: LoginErrorCode | null) {
  if (!code) return fallbackError
  return firebaseErrorMessages[code] ?? fallbackError
}
