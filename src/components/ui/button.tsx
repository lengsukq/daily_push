import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 preserve-3d",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-400 hover:to-blue-500 shadow-[0_10px_25px_-5px_rgba(59,130,246,0.4),0_4px_0_0_rgba(37,99,235,0.8),0_2px_0_0_rgba(29,78,216,0.6)] hover:shadow-[0_15px_35px_-5px_rgba(59,130,246,0.5),0_6px_0_0_rgba(37,99,235,0.8),0_3px_0_0_rgba(29,78,216,0.6)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_5px_15px_-5px_rgba(59,130,246,0.3),0_2px_0_0_rgba(37,99,235,0.8),0_1px_0_0_rgba(29,78,216,0.6)]",
        destructive: "bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 shadow-[0_10px_25px_-5px_rgba(239,68,68,0.4),0_4px_0_0_rgba(185,28,28,0.8)] hover:shadow-[0_15px_35px_-5px_rgba(239,68,68,0.5),0_6px_0_0_rgba(185,28,28,0.8)] hover:-translate-y-0.5 active:translate-y-0.5",
        outline: "border-2 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-sm shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 active:translate-y-0.5",
        secondary: "bg-gradient-to-br from-dark-700 to-dark-800 text-white hover:from-dark-600 hover:to-dark-700 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4),0_4px_0_0_rgba(30,41,59,0.8)] hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.5),0_6px_0_0_rgba(30,41,59,0.8)] hover:-translate-y-0.5 active:translate-y-0.5",
        ghost: "text-dark-300 hover:text-white hover:bg-white/5",
        link: "text-blue-400 underline-offset-4 hover:underline hover:text-blue-300",
        glow: "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6),0_0_100px_rgba(147,51,234,0.3)] hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-13 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
