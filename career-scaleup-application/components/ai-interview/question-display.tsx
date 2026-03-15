"use client";

import { useEffect, useState } from "react";

interface QuestionDisplayProps {
  category: string;
  questionText: string;
  isTyping?: boolean;
  typingSpeed?: number;
}

export function QuestionDisplay({
  category,
  questionText,
  isTyping = true,
  typingSpeed = 50,
}: QuestionDisplayProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isTyping) {
      setDisplayedText(questionText);
      setIsComplete(true);
      return;
    }

    setDisplayedText("");
    setIsComplete(false);

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < questionText.length) {
        setDisplayedText(questionText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [questionText, isTyping, typingSpeed]);

  return (
    <div className="flex flex-col items-center text-center">
      {/* Category Badge */}
      <div className="inline-flex px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
        {category}
      </div>

      {/* Question Text */}
      <div className="max-w-2xl">
        <p className="text-xl font-semibold text-foreground">
          {displayedText}
          {!isComplete && (
            <span className="inline-block w-0.5 h-5 bg-foreground ml-1 animate-pulse" />
          )}
        </p>
      </div>
    </div>
  );
}
