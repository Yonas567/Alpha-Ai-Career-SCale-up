"use client";

import { useState, useEffect, useCallback } from "react";
import { Volume2, Mic, MicOff, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionStepper } from "./question-stepper";
import { VideoPreview } from "./video-preview";
import { QuestionDisplay } from "./question-display";
import { TranscriptDisplay } from "./transcript-display";

// Mock questions - will come from AI based on resume + job description
const mockQuestions = [
  {
    id: 1,
    category: "Introduction question",
    question: "Can you briefly introduce yourself and tell me about your background?",
  },
  {
    id: 2,
    category: "Experience question",
    question: "Tell me about a challenging project you worked on and how you handled it.",
  },
  {
    id: 3,
    category: "Technical question",
    question: "How do you approach problem-solving when facing a complex technical issue?",
  },
  {
    id: 4,
    category: "Behavioral question",
    question: "Describe a time when you had to work with a difficult team member.",
  },
  {
    id: 5,
    category: "Situational question",
    question: "How would you handle a situation where you disagree with your manager's decision?",
  },
  {
    id: 6,
    category: "Closing question",
    question: "Why are you interested in this position and what makes you a good fit?",
  },
];

interface InterviewStepProps {
  jobTitle: string;
  onComplete: (answers: Record<number, string>) => void;
}

export function InterviewStep({ jobTitle, onComplete }: InterviewStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [isQuestionTyping, setIsQuestionTyping] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentQuestionData = mockQuestions[currentQuestion - 1];
  const answeredQuestions = Object.keys(answers).map(Number);

  // Speech synthesis for reading questions
  const speakQuestion = useCallback((text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // Speech recognition for recording answers
  const startRecording = useCallback(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setCurrentTranscript(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    (window as any).currentRecognition = recognition;
    recognition.start();
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    if ((window as any).currentRecognition) {
      (window as any).currentRecognition.stop();
    }
    setIsRecording(false);
    
    // Save the answer
    if (currentTranscript) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: currentTranscript,
      }));
    }
  }, [currentQuestion, currentTranscript]);

  const handleQuestionClick = (questionNum: number) => {
    // Save current answer if exists
    if (currentTranscript) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: currentTranscript,
      }));
    }
    
    setCurrentQuestion(questionNum);
    setCurrentTranscript(answers[questionNum] || "");
    setIsQuestionTyping(true);
  };

  const handleNextQuestion = () => {
    // Save current answer
    if (currentTranscript) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: currentTranscript,
      }));
    }

    if (currentQuestion < mockQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentTranscript(answers[currentQuestion + 1] || "");
      setIsQuestionTyping(true);
    }
  };

  const handleReviewClick = () => {
    // Save current answer and go to review
    if (currentTranscript) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: currentTranscript,
      }));
    }
    onComplete(answers);
  };

  // Speak question when it changes
  useEffect(() => {
    const timer = setTimeout(() => {
      speakQuestion(currentQuestionData.question);
    }, currentQuestionData.question.length * 50 + 500); // Wait for typing to complete

    return () => clearTimeout(timer);
  }, [currentQuestion, currentQuestionData.question, speakQuestion]);

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <QuestionStepper
          jobTitle={jobTitle}
          totalQuestions={mockQuestions.length}
          currentQuestion={currentQuestion}
          onQuestionClick={handleQuestionClick}
          onReviewClick={handleReviewClick}
          answeredQuestions={answeredQuestions}
        />
        <Button variant="ghost" size="icon">
          <Volume2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative p-6">
        {/* Video Preview - Top Right */}
        <div className="absolute top-6 right-6 z-10">
          <VideoPreview enabled={true} />
        </div>

        {/* Question Display - Center */}
        <div className="flex-1 flex items-center justify-center pb-32">
          <QuestionDisplay
            category={currentQuestionData.category}
            questionText={currentQuestionData.question}
            isTyping={isQuestionTyping}
          />
        </div>

        {/* Transcript Display - Bottom */}
        <div className="absolute bottom-6 left-6 right-6">
          <TranscriptDisplay
            transcript={currentTranscript}
            isRecording={isRecording}
          />
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-center gap-4 p-6 border-t border-border">
        <Button
          variant={isRecording ? "destructive" : "default"}
          size="lg"
          onClick={isRecording ? stopRecording : startRecording}
          className="gap-2"
        >
          {isRecording ? (
            <>
              <MicOff className="w-5 h-5" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Start Recording
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleNextQuestion}
          disabled={currentQuestion >= mockQuestions.length}
          className="gap-2"
        >
          <SkipForward className="w-5 h-5" />
          Next Question
        </Button>
      </div>
    </div>
  );
}
