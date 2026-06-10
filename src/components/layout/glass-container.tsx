"use client";

import { cn } from "@/lib/utils";
import { useState, useRef, MouseEvent } from "react";

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "emerald" | "none";
  hover3d?: boolean;
}

export function GlassContainer({ 
  children, 
  className,
  glowColor = "blue",
  hover3d = true
}: GlassContainerProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!hover3d || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 60;
    const rotateY = (centerX - x) / 60;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const glowColors = {
    blue: "rgba(59, 130, 246, 0.15)",
    purple: "rgba(147, 51, 234, 0.15)",
    emerald: "rgba(16, 185, 129, 0.15)",
    none: "transparent"
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative preserve-3d transition-all duration-300 ease-out",
        "bg-gradient-to-br from-white/[0.08] to-white/[0.02]",
        "backdrop-blur-xl backdrop-saturate-180",
        "border border-white/[0.1]",
        "rounded-2xl p-6",
        "shadow-depth",
        hover3d && "hover:shadow-depth-lg",
        className
      )}
      style={{
        transform: isHovered && hover3d
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(8px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
        boxShadow: isHovered
          ? `0 35px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 0 40px ${glowColors[glowColor]}`
          : undefined
      }}
    >
      {/* Top Highlight */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.1] via-transparent to-transparent opacity-0 transition-opacity duration-300 pointer-events-none" 
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
