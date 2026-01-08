"use client"

import { useState, useEffect, createContext, useContext, ReactNode } from "react"
import { User } from "firebase/auth"
import { onAuthStateChange } from "@/services/auth"
import { ensureUserProfile } from "@/services/user-profile"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user)
      setLoading(false)
      if (user) {
        ensureUserProfile(user).catch((error) => {
          console.error("Could not create user profile:", error)
        })
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

// Hook para proteger rotas
export function useRequireAuth() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  return { user, loading }
}
