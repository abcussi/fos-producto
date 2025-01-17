import { twMerge } from 'tailwind-merge';
import { StyledButtonProps } from './Button.d';

export function StyledButton({
  className,
  children,
  type = 'button',
  ...props
}: StyledButtonProps) {
  const baseStyles = `
    bg-transparent
    transition-all
    duration-300
    ease-in-out
    focus:outline-none
    leading-[normal]
    shadow-input
    outline-none
  `;

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={twMerge(baseStyles, className)}
      {...props}
    >
      {children}
    </button>
  );
}
