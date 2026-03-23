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
  const [phase, setPhase] = useState<"loading" | "exiting" | "hidden" | "background">("loading");
  
  // Total rows to cover screen + buffer for tilt
  const rowCount = 20;
  const rows = Array.from({ length: rowCount }, (_, i) => i);
  // Text repeated enough times to ensure seamless loop
  const rowText = Array.from({ length: 30 }, () => "Alas").join("   ");

  useEffect(() => {
    // Phase 1: loading -> exiting, then settle as subtle background texture.
    let backgroundTimer: ReturnType<typeof setTimeout> | undefined;
    const exitTimer = setTimeout(() => {
        if (onLoadingComplete) onLoadingComplete();
        setPhase("exiting");

        backgroundTimer = setTimeout(() => {
          setPhase("background");
        }, 0);
    }, 3500);

    return () => {
      clearTimeout(exitTimer);
      if (backgroundTimer) clearTimeout(backgroundTimer);
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

  return (
    <div
      className={`fixed inset-0 w-full h-full overflow-hidden ${
        phase === "background" ? "z-0 pointer-events-none" : "z-50 pointer-events-auto"
      } ${
        phase === "exiting" || phase === "background"
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
  phase: "loading" | "exiting" | "hidden" | "background";
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

    if (phase === "background") {
      // Snap to resting position instantly while still invisible.
      controls.set({ x: isEven ? "0%" : "-15%" });

      void controls
        .start({
          opacity: 0.055,
          transition: {
            duration: 0.6,
            delay: 0,
            ease: "easeOut",
          },
        })
        .then(() => {
          controls.start({
            x: isEven ? ["0%", "-15%"] : ["-15%", "0%"],
            transition: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 10,
              ease: "easeInOut",
            },
          });
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