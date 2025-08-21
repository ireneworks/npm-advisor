import React, { useEffect, useState } from "react";
import { Button } from "#components/shadcn/origin/button";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          variant="outline"
          className="fixed h-[42px] shadow-lg rounded-full cursor-pointer right-4 bottom-4 lg:right-10 lg:bottom-10"
        >
          <ChevronUp />
        </Button>
      )}
    </>
  );
}
