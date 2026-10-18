import css from './Modal2.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface Modal2Props {
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Modal2({ onClose, children }: Modal2Props) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  useEffect(() => {
    function handleEscapeClick(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleEscapeClick);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscapeClick);
      document.body.style.overflow = '';
    };
  });

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button onClick={onClose} className={css.closeButton}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
