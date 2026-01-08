"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex items-center justify-center px-4 py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    <Image
                        src="/images/not_found.png"
                        alt="Em construção"
                        width={500}
                        height={500}
                        className="mb-8 mx-auto"
                        priority
                    />
                    <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
                        Página não Encontrada
                    </h1>
                    <p className="text-sm sm:text-base text-neutral-200 max-w-md mx-auto">
                        Não conseguimoos encontrar a página que você procura.<br />
                    </p>
                </motion.div>
            </main>
        </div>
    );
}
