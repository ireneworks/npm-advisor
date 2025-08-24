import { useEffect, useState } from "react";

interface Props {
  threshold?: number | number[];
}

export default function useIntersectionObserver({ threshold = 0.5 }: Props) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
        }
      },
      { threshold },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [target, setTarget, threshold]);

  return { isIntersecting, setTarget };
}
