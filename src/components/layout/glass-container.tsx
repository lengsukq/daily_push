import { cn } from "@/lib/utils";

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassContainer({ children, className }: GlassContainerProps) {
  return (
    <div className={cn("glass-card p-6", className)}>
      {children}
    </div>
  );
}
