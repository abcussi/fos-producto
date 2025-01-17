export type ButtonVariant =
  'primary'
  | 'secondary'
  | 'white'
  | 'transparent'
  | 'blue';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  textColor?: string;
  borderBGreen?: boolean;
  widthFull?: boolean;
  fontSize?: number;
  type?: 'submit' | 'reset' | 'button';
  style?: React.CSSProperties;
}

export interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
  type: 'submit' | 'reset' | 'button';
  style?: React.CSSProperties;
}
