import { PropsWithChildren, useEffect, useRef } from "react";
import useIntersectionObserver from "#hooks/useIntersectionObserver";

interface Props {
  callback: () => void;
  isLoading?: boolean;
}

export default function InfiniteScroll({
  callback,
  children,
  isLoading = true,
}: PropsWithChildren<Props>) {
  const { isIntersecting, setTarget } = useIntersectionObserver({
    threshold: 0.3,
  });

  const prevIntersecting = useRef(false);

  useEffect(() => {
    if (!isLoading && isIntersecting && !prevIntersecting.current) {
      callback();
    }
    prevIntersecting.current = isIntersecting;
  }, [callback, isIntersecting, isLoading]);

  return (
    <>
      {children}
      {!isLoading && <div ref={setTarget} className={"size-1"} />}
    </>
  );
}
