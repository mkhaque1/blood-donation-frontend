import * as React from 'react';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-ink text-paper hover:bg-ink-soft rounded-[var(--radius-sharp)]',
        emergency:
          'bg-blood text-paper hover:bg-blood-dim rounded-[var(--radius-sharp)] font-semibold',
        outline:
          'border border-line text-ink hover:bg-paper-raised rounded-[var(--radius-sharp)]',
        ghost: 'hover:bg-paper-raised text-ink rounded-[var(--radius-sharp)]',
        link: 'text-blood underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'size-10',
        'icon-sm': 'size-8 [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;

    return React.cloneElement(child, {
      ...props,
      className: cn(classes, child.props.className),
    } as any);
  }

  return (
    <ButtonPrimitive data-slot='button' className={classes} {...props}>
      {children}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
