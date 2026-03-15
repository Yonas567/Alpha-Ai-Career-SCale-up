"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does AI matching work?",
    answer: "Our AI analyzes resumes, job descriptions, and candidate profiles to identify the best matches based on skills, experience, cultural fit, and job requirements. The algorithm continuously learns and improves to provide more accurate matches over time.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take data security seriously. All data is encrypted in transit and at rest. We comply with GDPR and other privacy regulations. Your personal information is never shared without your consent.",
  },
  {
    question: "How accurate is the AI interview coach?",
    answer: "Our AI interview coach uses advanced natural language processing to analyze your responses and provide real-time feedback. It's trained on thousands of successful interviews and provides personalized coaching tips to help you improve.",
  },
  {
    question: "Can I use this for free?",
    answer: "Yes! We offer a free tier for job seekers with access to basic features including resume analysis, job matching, and limited interview coaching. Premium features are available with a subscription.",
  },
  {
    question: "How do recruiters benefit?",
    answer: "Recruiters save time with AI-powered candidate screening, get instant compatibility scores, access a pool of verified candidates, and streamline the entire hiring process from posting to onboarding.",
  },
  {
    question: "What makes this different from other platforms?",
    answer: "Career ScaleUp combines AI-powered matching with personalized interview coaching, real-time resume optimization, and direct recruiter-candidate communication. Our platform focuses on both sides of the hiring equation, making it easier for everyone.",
  },
  {
    question: "How do I get started?",
    answer: "Simply sign up for a free account, create your profile, and upload your resume. Our AI will analyze your profile and start matching you with relevant opportunities. You can also use the interview coach to practice right away.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your account will remain active until the end of your billing period.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-muted/30 dark:bg-black/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about Career ScaleUp
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="border-border bg-card overflow-hidden"
              >
                <button
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

