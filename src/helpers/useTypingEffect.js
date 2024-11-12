import { useState, useEffect } from 'react';

const useTypingEffect = (value) => {
  const [text, setText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let i = 0;

    const intervalId = setInterval(() => {
      setIsAnimating(true);

      if (i === value.length) {
        clearInterval(intervalId);

        setTimeout(() => {
          setIsAnimating(false);
        }, 1000)

        return
      }

      const char = value[i];
      setText((prev) => prev + char);
      i++;
    }, 5);

    return () => {
      setText('');
      clearInterval(intervalId);
    };
  }, [value]);

  return { text, isAnimating };
};

export default useTypingEffect;