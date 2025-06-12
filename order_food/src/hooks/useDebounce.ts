import React, {useRef} from 'react';

function useDebounceRef<T>(
    ref: React.RefObject<T>,
    delay: number,
    callback: (val: T) => void
) {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastValueRef = useRef<T>(ref.current);

    const trigger = () => {
        const currentValue = ref.current;

        if (lastValueRef.current === currentValue) {
            return;
        }

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            lastValueRef.current = currentValue;
            callback(currentValue);
        }, delay);
    };

    return trigger;
}

export default useDebounceRef;



