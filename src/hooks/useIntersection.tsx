import { useCallback, useEffect, useRef } from 'react';

// interface IntersectionObserverInit {
    
// }

const useIntersection = (
  onIntersect: (
    _entry: IntersectionObserverEntry,
    _observer: IntersectionObserver,
  ) => void,
  options?: IntersectionObserverInit,
) => {
  const ref = useRef<HTMLDivElement>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!ref.current) return;

    const options = {
      rootMargin: '0px 0px 30% 0px',
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

export default useIntersection;
