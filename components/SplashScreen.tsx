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
  const [phase, setPhase] = useState<"loading" | "exiting" | "hidden" | "background">("loading");
  
  // Total rows to cover screen + buffer for tilt
  const rowCount = 20;
  const rows = Array.from({ length: rowCount }, (_, i) => i);
  // Text repeated enough times to ensure seamless loop
  const rowText = Array.from({ length: 30 }, () => "Alas").join("   ");

  useEffect(() => {
    // Phase 1: Loading -> Exiting
    const exitTimer = setTimeout(() => {
        setPhase("exiting");
    }, 3500);

    return () => clearTimeout(exitTimer);
  }, []);

  useEffect(() => {
      if (phase === "exiting") {
        // After exit animation completes, hide completely and show content
        const hiddenTimer = setTimeout(() => {
            if (onLoadingComplete) onLoadingComplete();
            setPhase("hidden");
        }, 1800); // Match the exit animation duration
        return () => clearTimeout(hiddenTimer);
      }
      
      if (phase === "hidden") {
        // After content has time to render, bring back as background
        const backgroundTimer = setTimeout(() => {
            setPhase("background");
        }, 800); // Delay before background slides back in
        return () => clearTimeout(backgroundTimer);
      }
  }, [phase, onLoadingComplete]);

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

  // Don't render anything during hidden phase
  if (phase === "hidden") {
    return null;
  }

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

const Row = ({ text, isEven, phase }: { text: string; isEven: boolean; phase: "loading" | "exiting" | "hidden" | "background" }) => {
    // Variants for the animation sequence
    const variants: Variants = {
        loading: {
            x: isEven ? ["0%", "-15%"] : ["-15%", "0%"],
            opacity: 1,
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 8,
                    ease: "easeInOut"
                },
                opacity: { duration: 0.5 }
            }
        },
        exiting: {
            x: isEven ? "-120%" : "120%",
            opacity: 1,
            transition: {
                duration: 1.8,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        background: {
            // Slide in from off-screen, then do perpetual back-and-forth
            x: isEven 
                ? ["-120%", "-25%", "0%", "-15%"] // Slide in from left, then oscillate
                : ["120%", "0%", "-15%", "0%"],   // Slide in from right, then oscillate
            opacity: 0.05, 
            transition: {
                x: {
                    times: [0, 0.05, 0.525, 1], // First 5% is slide-in, rest is oscillation
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 40, // Full cycle duration
                    ease: "linear"
                },
                opacity: { 
                    duration: 1.2
                }
            }
        }
    };

    return (
        <motion.div
            className={`${audiowide.className} text-4xl md:text-6xl text-[#F5F5DC] whitespace-nowrap`}
            style={{ marginLeft: isEven ? "-25vw" : "0" }} // Maintains the uneven offset look
            variants={variants}
            animate={phase}
        >
            {text}
        </motion.div>
    );
};