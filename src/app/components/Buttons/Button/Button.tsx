import { twMerge } from 'tailwind-merge';
import { ButtonProps } from './Button.d';
import { StyledButton } from './Button.styled';

function Button({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  className = '',
  widthFull = false,
  textColor,
  borderBGreen = false,
  fontSize = 16,
  style,
  type = 'button'
}:ButtonProps) {
  const borderBGreenClassNames = 'border-b-2-transparent border-b-[0.3em] border-primary-100 border-t-[0.3em] '
  + 'hover:border-b-green ';

  const variantClasses: { [key: string]: string } = {
    primary: ' fs-14 bg-condatyGreen text-white hover:opacity-[60%] flex items-center justify-center '
           + 'py-2.5 px-[2em] rounded-lg',
    secondary: ' fs-14 bg-white text-gray-placeholder hover:border-condatyGreen flex items-center '
             + ' justify-center py-2.5 px-[2em] rounded-lg border',
    white: ' fs-14 bg-white text-condatyGreen flex items-center justify-center rounded-lg p-[0.5em] '
              + 'hover:text-green hover:bg-background',
    blue: ' fs-14 bg-condatyBlue text-white hover:opacity-[60%] flex items-center justify-center rounded-lg p-[0.5em] ',
    transparent: ' ',
  };

  const baseClasses = twMerge(
    variantClasses[variant],
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
    borderBGreen ? borderBGreenClassNames : '',
    widthFull ? 'w-full' : ''
  );

  const mergedClasses = twMerge(baseClasses, `fs-${fontSize}`, className, textColor);

  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <StyledButton
      onClick={handleClick}
      className={mergedClasses}
      type={type}
      style={style}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
