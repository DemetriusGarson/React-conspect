import css from './Alert.module.css';
import clsx from 'clsx';
import { AiFillAlert } from 'react-icons/ai';

interface AlertProps {
  type?: 'success' | 'error';
  message?: string;
}

export default function Alert({ type, message }: AlertProps) {
  return (
    <p className={clsx(css.alert, type && css[type])}>
      <AiFillAlert className={css.alertIcon} size={24} />
      {message ? message : 'Default message'}
    </p>
  );
}
