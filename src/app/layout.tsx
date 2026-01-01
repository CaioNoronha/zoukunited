import "./globals.css"
import NavBar from "@/components/common/navbar"
import Footer from "@/components/common/fotter"
import { ScrollToTopOnMount } from "@/components/utils/scroll-to-top"
import { Providers } from "./providers"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <NavBar />
            <ScrollToTopOnMount />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
