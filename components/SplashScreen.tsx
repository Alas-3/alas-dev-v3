"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<"loading" | "exiting" | "hidden">("loading");
  
  // Total rows to cover screen + buffer for tilt
  const rowCount = 20;
  const rows = Array.from({ length: rowCount }, (_, i) => i);
  // Text repeated enough times to ensure seamless loop
  const rowText = Array.from({ length: 30 }, () => "Alas").join("   ");

  useEffect(() => {
    // Reveal the page quickly, then remove the animation after its exit transition.
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    const exitTimer = setTimeout(() => {
        if (onLoadingComplete) onLoadingComplete();
        setPhase("exiting");

        hideTimer = setTimeout(() => {
          setPhase("hidden");
        }, 1800);
    }, 1200);

    return () => {
      clearTimeout(exitTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [onLoadingComplete]);

  // Lock body scroll during loading/exiting
  useEffect(() => {
    if (phase === "loading" || phase === "exiting") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 w-full h-full overflow-hidden ${
        phase === "loading"
          ? "z-50 pointer-events-auto"
          : "z-0 pointer-events-none"
      } ${
        phase === "exiting"
          ? "bg-transparent transition-colors duration-[1600ms]"
          : "bg-[#121212]"
      }`}
    >
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 md:gap-8 transform -rotate-[45deg] scale-150 origin-center select-none">
        {rows.map((row) => {
             const isEven = row % 2 === 0;
             return (
                <Row 
                    key={row} 
                    text={rowText} 
                    isEven={isEven} 
                    phase={phase}
                    rowIndex={row}
                />
             );
        })}
      </div>
    </div>
  );
};

const Row = ({ text, isEven, phase, rowIndex }: {
  text: string;
  isEven: boolean;
  phase: "loading" | "exiting" | "hidden";
  rowIndex: number;
}) => {
  const controls = useAnimation();
  const staggerDelay = rowIndex * 0.045;

  useEffect(() => {
    if (phase === "loading") {
      controls.start({
        x: isEven ? ["0%", "-15%"] : ["-15%", "0%"],
        opacity: 1,
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 8,
            ease: "easeInOut",
          },
          opacity: { duration: 0.5 },
        },
      });
      return;
    }

    if (phase === "exiting") {
      controls.start({
        x: isEven ? "-110%" : "110%",
        opacity: 0,
        transition: {
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
          delay: staggerDelay,
          opacity: {
            duration: 1,
            delay: staggerDelay + 0.2,
            ease: "easeIn",
          },
        },
      });
      return;
    }

    controls.start({ opacity: 0 });
  }, [controls, isEven, phase, rowIndex, staggerDelay]);

  return (
    <motion.div
      className={`${audiowide.className} text-4xl md:text-6xl text-[#F5F5DC] whitespace-nowrap`}
      style={{ marginLeft: isEven ? "-25vw" : "0" }}
      initial={{ opacity: 0, x: isEven ? "-120%" : "120%" }}
      animate={controls}
    >
      {text}
    </motion.div>
  );
};