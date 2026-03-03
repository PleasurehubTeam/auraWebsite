"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ExploreDescriptionSectionProps {
  description: string;
}

export function ExploreDescriptionSection({
  description,
}: ExploreDescriptionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {shouldReduceMotion ? (
          <p
            className="font-montserrat text-left text-lg text-neutral-800 md:text-justify md:text-2xl lg:text-3xl"
            style={{ lineHeight: 1.5 }}
          >
            {description}
          </p>
        ) : (
          <motion.p
            className="font-montserrat text-left text-lg text-neutral-800 md:text-justify md:text-2xl lg:text-3xl"
            style={{ lineHeight: 1.5 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
