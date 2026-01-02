"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WorkInProgress() {
    return (
        <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
            <main className="flex flex-1 items-center justify-center px-4 py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    <Image
                        src="/logo-zouk-united.png"
                        alt="Zouk United"
                        width={220}
                        height={60}
                        className="mx-auto mb-8 h-10 w-auto"
                        priority
                    />
                    <h1 className="mb-2 text-2xl font-semibold text-white sm:text-3xl">
                        Página em construção
                    </h1>
                    <p className="mx-auto max-w-md text-sm text-white/70 sm:text-base">
                        Estamos preparando essa parte do site com muito carinho.
                        <br />
                        Volte em breve para mais conteúdo!
                    </p>
                </motion.div>
            </main>
        </div>
    );
}
