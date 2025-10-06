import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "glass-button text-primary-foreground hover:scale-105 active:scale-95",
        destructive:
          "glass-button bg-gradient-to-r from-destructive/80 to-destructive text-destructive-foreground hover:from-destructive hover:to-destructive/90 hover:scale-105 active:scale-95",
        outline:
          "glass-subtle border-glass-border hover:glass backdrop-blur-md hover:scale-105 active:scale-95",
        secondary:
          "glass-subtle bg-glass-gradient-secondary text-secondary-foreground hover:backdrop-blur-xl hover:scale-105 active:scale-95",
        ghost: "backdrop-blur-sm hover:glass-subtle hover:scale-105 active:scale-95",
        link: "text-primary underline-offset-4 hover:underline backdrop-blur-sm",
        glass: "glass rounded-xl backdrop-blur-xl hover:glass-intense hover:scale-105 active:scale-95",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-xl",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-2xl px-8",
        icon: "h-10 w-10 rounded-xl",
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
