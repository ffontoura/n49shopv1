import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { useState } from "preact/compat";

export interface Question {
  question: string;
  answer: string;
}

export interface Props {
  questions: Question[];
}

export default function Faq({ questions }: Props) {
  return (
    <div class="home-container home-container-mobile">
      <ul class="max-w-[900px] mx-auto my-8">
        {questions.map((question, idx) => {
          return <Question question={question} idx={idx} />;
        })}
      </ul>
    </div>
  );
}

function Question({ question, idx }: { question: Question; idx: number }) {
  const opened = useSignal(false);
  const answerRef = useRef<HTMLDivElement>(null);

  const height = useSignal(0);

  useEffect(() => {
    if (opened.value && answerRef.current) {
      height.value = answerRef.current.scrollHeight;
    } else {
      height.value = 0;
    }
  }, [opened.value]);

  const toggleQuestion = () => {
    opened.value = !opened.value;
  };

  return (
    <li class="border-b-[1px] border-[#C7C7CC] overflow-hidden">
      <h3
        onClick={toggleQuestion}
        class={`w-full py-5 cursor-pointer text-[14px] relative text-[#1C1C1E]`}
      >
        <span class="pr-3">{idx + 1 + "."}</span>
        {question.question}
        <i
          class={`absolute top-[50%] right-0 faq-icon ${
            opened.value
              ? "icon-minus faq-icon-minus font-bold"
              : "icon-plus faq-icon-plus"
          } float-right text-[18px]`}
        />
      </h3>
      <div
        class={`px-[25px] text-[14px] overflow-hidden ${
          opened.value && "mb-5"
        }`}
        style={{
          maxHeight: `${height}px`,
          transition: "max-height 0.5s ease",
        }}
        ref={answerRef}
      >
        {question.answer}
      </div>
    </li>
  );
}
