import { useRef } from 'react';
import isEqual from 'react-fast-compare';


function useDeepMemo(value) {
    const valueRef = useRef();

    if (!isEqual(valueRef.current, value)) {
        valueRef.current = value;
    }

    return valueRef.current;
}

export default useDeepMemo;
