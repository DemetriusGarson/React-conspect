import clsx from 'clsx';
import css from './Button.module.css';

interface ButtonProps {
  type?: 'submit' | 'button' | 'reset';
  variant?: 'primary' | 'secondary';
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  variant,
  text,
  onClick,
  type = 'button',
}: ButtonProps) {
  if (!onClick) {
    onClick = handleClick;
  }
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    console.log(`I'm ${variant} button`);
    console.log(event);
    console.log(event.target);
    console.log(event.currentTarget);
  }
  return (
    <button
      type={type}
      className={clsx(css.button, variant && css[variant])}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
