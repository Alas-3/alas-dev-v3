"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<"loading" | "exiting" | "background">("loading");
  
  // Total rows to cover screen + buffer for tilt
  const rowCount = 20;
  const rows = Array.from({ length: rowCount }, (_, i) => i);
  // Text repeated enough times to ensure seamless loop
  const rowText = Array.from({ length: 30 }, () => "Alas").join("   ");

  useEffect(() => {
    // Phase 1: Loading (Single Fast cycle) -> Exiting
    // 2000ms is roughly one full cycle duration for the user to register it
    const exitTimer = setTimeout(() => {
        setPhase("exiting");
    }, 2000);

    return () => clearTimeout(exitTimer);
  }, []);

  useEffect(() => {
      if (phase === "exiting") {
        // Reduced wait time to 800ms to quicken re-entry
        const backgroundTimer = setTimeout(() => {
            if (onLoadingComplete) onLoadingComplete();
            setPhase("background");
        }, 800); 
        return () => clearTimeout(backgroundTimer);
      }
  }, [phase, onLoadingComplete]);

  // Lock body scroll during loading/exiting
  useEffect(() => {
    if (phase !== "background") {
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
      className={`fixed inset-0 w-full h-full overflow-hidden transition-colors duration-1000 bg-[#121212] ${
        phase === "background" ? "z-0 pointer-events-none" : "z-50 pointer-events-auto"
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
                />
             );
        })}
      </div>
    </div>
  );
};

const Row = ({ text, isEven, phase }: { text: string; isEven: boolean; phase: "loading" | "exiting" | "background" }) => {
    // Variants for the animation sequence
    const variants: Variants = {
        loading: {
            x: isEven ? ["0%", "-25%"] : ["-25%", "0%"],
            opacity: 1,
            transition: {
                x: {
                    repeat: Infinity,
                    duration: 4, 
                    ease: "easeInOut"
                },
                opacity: { duration: 0.5 }
            }
        },
        exiting: {
            // Slide completely off screen. Increased to 150% to ensure clearance.
            x: isEven ? "-150%" : "150%", 
            opacity: 1,
            transition: {
                duration: 1.2, 
                ease: "easeInOut"
            }
        },
        background: {
            // Fast entry then slow drift
            x: isEven ? ["-150%", "-25%", "35%"] : ["150%", "0%", "-60%"],
            opacity: 0.05, 
            transition: {
                x: {
                    repeat: Infinity,
                    duration: 120, // 2 minutes
                    ease: "linear",
                    times: [0, 0.02, 1], // 2% of time (2.4s) to enter, then drift
                    delay: 0
                },
                opacity: { 
                    duration: 1.5,
                    delay: 0.2 
                }
            }
        }
    };

    return (
        <motion.div
            className={`${audiowide.className} text-4xl md:text-6xl text-[#F5F5DC] whitespace-nowrap`}
            style={{ marginLeft: isEven ? "-25vw" : "0" }}
            variants={variants}
            animate={phase}
        >
            {text}
        </motion.div>
    );
};
