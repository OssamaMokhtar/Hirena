import { cn } from "@/lib/utils";

interface BadgeProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Badge({ className, variant = "default", size = "md", ...props }: BadgeProps) {
  const baseStyle = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
  };

  const sizes = {
    sm: "text-[10px] px-1.5 py-0",
    md: "text-xs px-2.5 py-0.5",
    lg: "text-sm px-3 py-1",
  };

  return (
    <div
      className={cn(baseStyle, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
