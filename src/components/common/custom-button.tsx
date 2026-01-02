import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "dark" | "neutral" | "danger";
  fullWidth?: boolean;
}

const variantClasses = {
  primary:
    "bg-[var(--ds-primary-pure)] hover:bg-[var(--ds-primary-1)] text-neutral-100",
  secondary:
    "bg-[var(--ds-secondary-pure)] hover:bg-[var(--ds-secondary-1)] text-neutral-100",
  dark:
    "bg-[var(--ds-neutral-5)] hover:bg-[var(--ds-neutral-4)] text-neutral-100 border border-[var(--ds-neutral-4)]",
  neutral:
    "bg-white border border-neutral-300 text-neutral-600 hover:bg-neutral-200",
  danger:
    "bg-red-400 hover:bg-red-500 text-white",
};

export function CustomButton({
  children,
  icon,
  variant = "secondary",
  fullWidth,
  className,
  type = "button",
  disabled = false,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      type={type}
      disabled={disabled}
      className={cn(
        "relative py-5 px-8 text-[14px] font-semibold rounded-full shadow-md transition-all text-center",
        variantClasses[variant],
        fullWidth && "w-full",
        "font-sans",
        className,
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      )}
      {...props}
    >
      {icon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg leading-none">
          {icon}
        </span>
      )}
      <span className={cn(icon && "pl-6")}>{children}</span>
    </Button>
  );
}
