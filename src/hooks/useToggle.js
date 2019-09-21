import {
    useState,
    useCallback,
    useDebugValue,
} from 'react';

const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    useDebugValue(state);
    const toggle = useCallback(() => setState((value) => !value), []);
    return [state, toggle];
};

export default useToggle;
