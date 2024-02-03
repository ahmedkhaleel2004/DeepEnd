import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ValueIcon } from "@radix-ui/react-icons";

interface AccordQuestions {
  question: string;
  answer: string;
  valueItem: string;
}

const AccordianQuestions = ({
  question,
  answer,
  valueItem,
}: AccordQuestions) => {
  return (
    <div className="flex items-center justify-center">
      <Accordion type="single" collapsible className="w-5/6 pb-2">
        <AccordionItem value={valueItem}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AccordianQuestions;
