import { useState, useCallback } from "react";
import type {
  Message,
  QuestionCategory,
} from "@/components/ai-interview/types";
import {
  getFirstQuestion,
  getAIResponse,
  getInitialQuestionCategories,
} from "@/components/ai-interview/interview-utils";

export function useInterviewState() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>("technical");
  const [questionCategories, setQuestionCategories] = useState<
    QuestionCategory[]
  >(getInitialQuestionCategories());

  const updateQuestionCategories = useCallback((questionCount: number) => {
    setQuestionCategories((prev) => {
      const updated = [...prev];

      if (questionCount >= 2 && !updated[0].completed) {
        updated[0] = { ...updated[0], completed: true };
        setCurrentCategory("behavioral");
      } else if (questionCount >= 4 && !updated[1].completed) {
        updated[1] = { ...updated[1], completed: true };
        setCurrentCategory("ethical");
      } else if (questionCount >= 6 && !updated[2].completed) {
        updated[2] = { ...updated[2], completed: true };
        setCurrentCategory("situational");
      } else if (questionCount >= 8 && !updated[3].completed) {
        updated[3] = { ...updated[3], completed: true };
      }

      return updated;
    });
  }, []);

  const startInterview = useCallback(
    (interviewType: string, difficulty: string) => {
      setIsInterviewStarted(true);
      setIsInterviewComplete(false);
      setMessages([]);
      setCurrentCategory("technical");
      setQuestionCategories(getInitialQuestionCategories());

      setTimeout(() => {
        const firstQuestion = getFirstQuestion(interviewType, difficulty);
        setMessages([
          {
            id: "1",
            text: firstQuestion,
            variant: "ai",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }, 500);
    },
    []
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        text,
        variant: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => {
        const updatedWithUser = [...prev, userMessage];

        if (updatedWithUser.length >= 8) {
          setIsInterviewComplete(true);
          setIsLoading(false);
          return updatedWithUser;
        }

        return updatedWithUser;
      });

      setIsLoading(true);

      setTimeout(() => {
        setMessages((prev) => {
          const aiResponse = getAIResponse(text, prev.length);
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: aiResponse,
            variant: "ai",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          const updated = [...prev, aiMessage];
          const questionCount = updated.length;
          updateQuestionCategories(questionCount);

          if (updated.length >= 8) {
            setIsInterviewComplete(true);
          }

          setIsLoading(false);
          return updated;
        });
      }, 1000);
    },
    [updateQuestionCategories]
  );

  const resetInterview = useCallback(() => {
    setIsInterviewStarted(false);
    setIsInterviewComplete(false);
    setMessages([]);
    setCurrentCategory("technical");
    setQuestionCategories(getInitialQuestionCategories());
  }, []);

  return {
    messages,
    isInterviewStarted,
    isInterviewComplete,
    isLoading,
    currentCategory,
    questionCategories,
    startInterview,
    sendMessage,
    resetInterview,
  };
}
