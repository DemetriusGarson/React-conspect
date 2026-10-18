import { useEffect } from 'react';
import css from './Modal3.module.css';
import { createPortal } from 'react-dom';

interface Modal3Props {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal3({ onClose, children }: Modal3Props) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  useEffect(() => {
    function handleEscapeClick(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.body.addEventListener('keydown', handleEscapeClick);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.removeEventListener('keydown', handleEscapeClick);
      document.body.style.overflow = 'hidden';
    };
  }, [onClose]);
  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button type="button" className={css.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
