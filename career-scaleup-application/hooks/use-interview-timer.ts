import { useState, useEffect, useRef } from "react";

export function useInterviewTimer(
  isInterviewStarted: boolean,
  isInterviewComplete: boolean
) {
  const [interviewTime, setInterviewTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isInterviewStarted && !isInterviewComplete) {
      timerRef.current = setInterval(() => {
        setInterviewTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isInterviewStarted, isInterviewComplete]);

  const resetTimer = () => {
    setInterviewTime(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return { interviewTime, resetTimer };
}

