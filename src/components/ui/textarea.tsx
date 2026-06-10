import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-xl px-4 py-3 text-sm transition-all duration-300",
          "bg-gradient-to-br from-black/30 to-black/20 backdrop-blur-sm",
          "border border-white/10 text-white placeholder:text-white/30",
          "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)_inset,0_2px_4px_-2px_rgba(0,0,0,0.2)_inset]",
          "focus:outline-none focus:border-blue-500/50 focus:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)_inset,0_0_0_3px_rgba(59,130,246,0.2),0_0_20px_rgba(59,130,246,0.1)]",
          "hover:border-white/20 hover:bg-black/40",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
