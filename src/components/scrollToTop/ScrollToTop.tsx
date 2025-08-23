import React, { useCallback, useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import Button from "#components/base/Button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <Button
      type="button"
      variant="outline"
      onClick={scrollToTop}
      className="w-[40px] h-[40px] fixed shadow-lg rounded-full right-4 bottom-4 lg:right-10 lg:bottom-10"
    >
      <ChevronUp className="stroke-gray-400" />
    </Button>
  );
}
