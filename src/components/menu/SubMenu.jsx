import React from 'react';
import cn from 'classnames';
import useModal from 'hooks/useModal';

const SubMenu = ({ isOpen, back, children }) => {
  const ref = useModal(isOpen);

  return (
    <dialog
      ref={ref}
      aria-label='How to play'
      className={cn('submenu', { 'submenu--open': isOpen })}
      onCancel={(event) => {
        event.preventDefault();
        back();
      }}
    >
      <header className='menu__header'>
        <button type='button' className='icon' onClick={back}>
          back
        </button>
      </header>
      <div className='menu__body menu__body--with-header'>
        {children}
      </div>
    </dialog>
  );
};

export default SubMenu;
