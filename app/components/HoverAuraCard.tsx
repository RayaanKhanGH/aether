"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface HoverAuraCardProps {
  children: React.ReactNode;
  className?: string;
  auraColor?: string;
}

export const HoverAuraCard: React.FC<HoverAuraCardProps> = ({ 
  children, 
  className = "", 
  auraColor = "rgba(200, 169, 126, 0.15)" // Aether Champagne Gold
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const auraX = useSpring(mouseX, springConfig);
  const auraY = useSpring(mouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden group/aura ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-700 opacity-0 group-hover/aura:opacity-100"
        style={{
          background: useTransform(
            [auraX, auraY],
            ([latestX, latestY]) => 
              `radial-gradient(400px circle at ${latestX}px ${latestY}px, ${auraColor}, transparent 80%)`
          ),
        }}
      />
      {children}
    </div>
  );
};
