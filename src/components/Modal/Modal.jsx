import { useEffect } from 'react';
import css from '../Modal/Modal.module.css'

export default function Modal({ children, onCloseModal }) {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onCloseModal]);

  const handleBackdropClick = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      onCloseModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.content}>{children}</div>
    </div>
  );
}