import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded font-semibold cursor-pointer whitespace-nowrap font-medium disabled:pointer-events-none disabled:opacity-50 shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        md: "h-9 px-3.5 py-2 has-[>svg]:px-3",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      },
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  },
);

interface Props extends VariantProps<typeof button> {}

type ButtonProps = Props & React.ComponentProps<"button">;

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  size,
  variant,
  className,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={button({ size, variant, className })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
