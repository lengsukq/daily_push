"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button3dVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        glass: "bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 shadow-lg shadow-black/10",
        metal: "bg-gradient-to-b from-gray-200 to-gray-400 border border-gray-300 text-gray-800 hover:from-gray-300 hover:to-gray-500 shadow-xl shadow-black/20",
        neon: "bg-gradient-to-r from-cyan-500 to-blue-500 border border-cyan-400/30 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]",
        dark: "bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 shadow-xl shadow-black/20",
        ghost: "bg-transparent border border-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        outline: "bg-transparent border border-input text-foreground hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10",
      },
      depth: {
        flat: "translate-z-0",
        raised: "translate-z-1 hover:translate-z-2",
        floating: "translate-z-2 hover:translate-z-4",
        elevated: "translate-z-4 hover:translate-z-6",
      },
      hoverEffect: {
        none: "",
        lift: "hover:-translate-y-1",
        pop: "hover:-translate-y-2 hover:scale-105",
        glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]",
        press: "active:scale-95",
      },
    },
    defaultVariants: {
      variant: "glass",
      size: "default",
      depth: "raised",
      hoverEffect: "lift",
    },
  }
);

export interface Button3dProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button3dVariants> {
  asChild?: boolean;
}

const Button3d = React.forwardRef<HTMLButtonElement, Button3dProps>(
  ({ className, variant, size, depth, hoverEffect, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(button3dVariants({ variant, size, depth, hoverEffect, className }))}
        ref={ref}
        style={{ perspective: "1000px" }}
        {...props}
      />
    );
  }
);
Button3d.displayName = "Button3d";

export { Button3d, button3dVariants };
