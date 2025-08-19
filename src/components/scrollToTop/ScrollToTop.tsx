import React, { useEffect, useState } from "react";
import { Button } from "#components/shadcn/button";
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
          className="fixed right-10 bottom-10 h-[42px] shadow-lg rounded-full cursor-pointer"
        >
          <ChevronUp />
        </Button>
      )}
    </>
  );
}
