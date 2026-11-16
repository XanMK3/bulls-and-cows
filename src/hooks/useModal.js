import { useEffect, useRef } from 'react';

const useModal = (isOpen) => {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!isOpen) return undefined;

    dialog.showModal();
    return () => dialog.close();
  }, [isOpen]);

  return ref;
};

export default useModal;
