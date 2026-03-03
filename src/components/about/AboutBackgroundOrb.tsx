"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutBackgroundOrb() {
  return (
    <motion.div
      className="pointer-events-none absolute z-0"
      style={{ top: "0%", left: "50%", x: "-50%", y: "-70%" }}
      animate={{ rotate: [30, 45, 30, 15, 30] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <Image
        src="/images/aura-index-icon-03.png"
        alt=""
        width={800}
        height={800}
        className="w-[120vw] max-w-none opacity-80"
      />
    </motion.div>
  );
}
