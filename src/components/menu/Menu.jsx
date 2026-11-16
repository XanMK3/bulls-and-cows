import React from 'react';
import cn from 'classnames';
import useModal from 'hooks/useModal';

const Menu = ({
  isOpen,
  close,
  children,
}) => {
  const ref = useModal(isOpen);

  return (
    <dialog
      ref={ref}
      aria-label='Game menu'
      className={cn('menu', { 'menu--open': isOpen })}
      onCancel={(event) => {
        event.preventDefault();
        if (close) close();
      }}
    >
      <div className='menu__body'>
        <div className='menu__list'>
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default Menu;
