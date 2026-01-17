const ADMIN_EMAILS = [
  "admin1@example.com",
  "admin2@example.com",
  "admin3@example.com",
  "admin-test@example.com",
]

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export function isAdminEmail(email?: string | null) {
  if (!email) return false
  const normalized = normalizeEmail(email)
  return ADMIN_EMAILS.some((adminEmail) => normalizeEmail(adminEmail) === normalized)
}
