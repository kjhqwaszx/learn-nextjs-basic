import React, { useEffect, useState } from 'react';

const UseDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    //delay 시간 이후동안 값이 변경되지 않으면 debouncedValue 변경
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    //defs 변수인 value 와 delay 값이 변경되면( == 타이핑이 이루어지면 ) unmount 되고 다시 mount 된다.
    // 키보드 입력이 delay시간 전에 계속 이루어지면 clearTimeout이 동작하므로 debouncedValue값이 변경되지 않는다.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export { UseDebounce };
