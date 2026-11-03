import { useRef, useLayoutEffect } from 'react';
import './fadeIn.scss';

const ANIMATION_CLASS_NAME = 'fade-in-animation';

const useFadeIn = (trigger) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleAnimationEnd = (event) => {
      if (event.target === element) {
        element.classList.remove(ANIMATION_CLASS_NAME);
      }
    };

    // Restart the animation when the trigger changes
    element.classList.remove(ANIMATION_CLASS_NAME);
    void element.offsetWidth;
    element.classList.add(ANIMATION_CLASS_NAME);

    element.addEventListener('animationend', handleAnimationEnd);

    element.scrollIntoView({ behavior: 'smooth' });

    return () => {
      element.removeEventListener('animationend', handleAnimationEnd);
      element.classList.remove(ANIMATION_CLASS_NAME);
    };
  }, [trigger]);

  return ref;
};

export default useFadeIn;
