"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const card3dVariants = cva(
  "rounded-2xl border transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        glass: "bg-white/10 backdrop-blur-xl border-white/20 shadow-xl shadow-black/10",
        metal: "bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 border-gray-200 shadow-2xl shadow-black/20",
        neon: "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.3)]",
        dark: "bg-slate-800/80 border-slate-700/50 shadow-xl shadow-black/20",
      },
      depth: {
        flat: "translate-z-0",
        raised: "translate-z-1 hover:translate-z-2",
        floating: "translate-z-2 hover:translate-z-4",
        elevated: "translate-z-4 hover:translate-z-6",
      },
      hoverEffect: {
        none: "",
        lift: "hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
        rotate: "hover:rotateX-2 hover:rotateY-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
        glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]",
        pop: "hover:-translate-y-3 hover:scale-105 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]",
      },
    },
    defaultVariants: {
      variant: "glass",
      depth: "raised",
      hoverEffect: "lift",
    },
  }
);

export interface Card3dProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card3dVariants> {}

const Card3d = React.forwardRef<HTMLDivElement, Card3dProps>(
  ({ className, variant, depth, hoverEffect, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(card3dVariants({ variant, depth, hoverEffect }), className)}
      style={{ perspective: "1000px" }}
      {...props}
    />
  )
);
Card3d.displayName = "Card3d";

const Card3dHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
Card3dHeader.displayName = "Card3dHeader";

const Card3dTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
Card3dTitle.displayName = "Card3dTitle";

const Card3dDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
Card3dDescription.displayName = "Card3dDescription";

const Card3dContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
Card3dContent.displayName = "Card3dContent";

const Card3dFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
Card3dFooter.displayName = "Card3dFooter";

export {
  Card3d,
  Card3dHeader,
  Card3dFooter,
  Card3dTitle,
  Card3dDescription,
  Card3dContent,
  card3dVariants,
};
