import React, { useEffect } from 'react';

const UseOnClickOutside = (ref, handler) => {
  useEffect(() => {
    //eventListener 를 설정해 마우스 클릭이 발생 할경우 callback함수 실행
    const listener = (event) => {
      console.log('ref', ref.current);
      console.log('target', event.target);
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
  return <div></div>;
};

export default UseOnClickOutside;
