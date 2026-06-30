import { useState, useEffect } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  startDelay?: number;
}

export function useTypewriter({ text, speed = 40, startDelay = 0 }: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      setIsComplete(true);
      setShowCursor(false);
      return;
    }

    let currentIndex = 0;
    let typingInterval: ReturnType<typeof setInterval>;

    const startTimeout = setTimeout(() => {
      typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsComplete(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(typingInterval);
    };
  }, [text, speed, startDelay]);

  useEffect(() => {
    if (!isComplete) {
      const blinkInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 530);
      return () => clearInterval(blinkInterval);
    } else {
      const blinkInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 530);
      const stopBlinkTimeout = setTimeout(() => {
        clearInterval(blinkInterval);
        setShowCursor(false);
      }, 2500);
      return () => {
        clearInterval(blinkInterval);
        clearTimeout(stopBlinkTimeout);
      };
    }
  }, [isComplete]);

  return { displayedText, isComplete, showCursor };
}
