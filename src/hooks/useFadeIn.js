import { useRef, useLayoutEffect } from 'react';
import { checkSmoothScrollSupport } from 'utils';
import './fadeIn.scss';

const isSmoothScrollSupported = checkSmoothScrollSupport();
const FADE_TIMEOUT = 400;

const fadeIn = (element) => {
    element.classList.add('fade-in-animation');
    return setTimeout(() => {
        element.classList.remove('fade-in-animation');
    }, FADE_TIMEOUT);
};

const scrollIntoView = (element) => {
    if (!isSmoothScrollSupported) return;
    element.scrollIntoView({ behavior: 'smooth' });
};

const useFadeIn = (deps = []) => {
    const elementRef = useRef();
    const timeoutRef = useRef();

    useLayoutEffect(() => {
        if (elementRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = fadeIn(elementRef.current);
            scrollIntoView(elementRef.current);
        }

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, deps);

    return elementRef;
};

export default useFadeIn;
