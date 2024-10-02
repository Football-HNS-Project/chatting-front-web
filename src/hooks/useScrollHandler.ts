import { useCallback, useEffect, useRef, useState } from "react";

import { useInView } from "react-intersection-observer";

export const useScrollHandler = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const standardMessageRef = useRef<HTMLDivElement>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const { ref: loadMoreRef, inView } = useInView();

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 1;
      setShouldScrollToBottom(isAtBottom);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const scrollToStandardMessage = useCallback(() => {
    setTimeout(() => {
      if (standardMessageRef.current && containerRef.current) {
        containerRef.current.scrollTop =
          standardMessageRef.current.offsetTop -
          containerRef.current.offsetHeight / 2;
      }
    }, 0);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  return {
    containerRef,
    standardMessageRef,
    loadMoreRef,
    inView,
    shouldScrollToBottom,
    scrollToStandardMessage,
    scrollToBottom,
  };
};
