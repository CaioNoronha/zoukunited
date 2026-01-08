"use client";

import NavBar from "@/components/common/navbar";
import Footer from "@/components/common/fotter";
import NotFound from "@/components/common/not-found";
import ResultsBackground from "@/components/common/results-background";

export default function GlobalNotFound() {
  return (
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <main className="flex-1">
          <ResultsBackground image="/images/background.jpeg" />
          <NotFound />
        </main>
        <Footer />
      </div>
  );
}
