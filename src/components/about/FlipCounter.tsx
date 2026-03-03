"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FlipCounterProps {
  value: number;
  suffix?: string;
}

/** Duration of the spin loop phase per digit (seconds) */
const SPIN_INTERVAL = 0.08;
/** Stagger between each digit stopping (seconds) */
const STOP_STAGGER = 0.6;
/** Duration of the deceleration phase when a digit stops */
const BRAKE_DURATION = 0.8;

function RollingDigit({
  digit,
  stopDelay,
}: {
  digit: string;
  stopDelay: number;
}) {
  const numericDigit = parseInt(digit);
  const isNumber = !isNaN(numericDigit);
  if (!isNumber) {
    return (
      <motion.span
        className="inline-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15, delay: stopDelay }}
      >
        {digit}
      </motion.span>
    );
  }

  // Spinning cycles (looping phase) + final landing digits
  const spinCycles = Math.ceil(stopDelay / SPIN_INTERVAL / 10) + 2;
  const items: number[] = [];
  for (let c = 0; c < spinCycles; c++) {
    for (let d = 0; d <= 9; d++) items.push(d);
  }
  for (let d = 0; d <= numericDigit; d++) items.push(d);

  const finalIndex = items.length - 1;

  // Total duration = spinning phase + braking phase
  const totalDuration = stopDelay + BRAKE_DURATION;

  return (
    <span
      className="relative inline-block overflow-hidden align-bottom"
      style={{ height: "1em", lineHeight: 1 }}
    >
      <motion.span
        className="flex flex-col items-center"
        style={{ lineHeight: 1 }}
        initial={{ y: 0 }}
        animate={{ y: `-${finalIndex}em` }}
        transition={{
          duration: totalDuration,
          ease: [0, 0, 0.2, 1],
        }}
      >
        {items.map((d, i) => (
          <span key={i} className="block" style={{ height: "1em" }}>
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function FlipCounter({ value, suffix }: FlipCounterProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const digits = value.toLocaleString("en-US").split("");
  const displayText = suffix
    ? `${value.toLocaleString("en-US")}${suffix}`
    : value.toLocaleString("en-US");

  if (shouldReduceMotion) {
    return (
      <div
        ref={ref}
        className="font-montserrat text-3xl font-bold text-black md:text-5xl lg:text-6xl"
      >
        {displayText}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="font-montserrat text-3xl font-bold text-black md:text-5xl lg:text-6xl"
      aria-label={displayText}
    >
      {triggered ? (
        <>
          {(() => {
            let digitIndex = 0;
            const allChars = [...digits, ...(suffix ? [suffix] : [])];
            return allChars.map((char, i) => {
              const isNum = !isNaN(parseInt(char));
              const stop = digitIndex * STOP_STAGGER;
              if (isNum) digitIndex++;
              return (
                <RollingDigit
                  key={`${i}-${char}`}
                  digit={char}
                  stopDelay={stop}
                />
              );
            });
          })()}
        </>
      ) : (
        <span className="invisible">{displayText}</span>
      )}
    </div>
  );
}
