import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className="text-lg font-medium group-hover:text-white/90 transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-white/50 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-white/70 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How does the ideation process work?",
      answer:
        "Our ideation process combines AI-driven market analysis with human creativity. We help you validate concepts through data-driven insights, customer feedback loops, and iterative testing phases to ensure your idea has the highest chance of success.",
    },
    {
      question: "What's included in the validation phase?",
      answer:
        "The validation phase includes market size analysis, competitor research, customer interviews, and prototype testing. We use advanced analytics to help you understand market fit, potential revenue streams, and scaling opportunities.",
    },
    {
      question: "How long does it take to build an MVP?",
      answer:
        "MVP development typically takes 4-12 weeks, depending on complexity. Our agile approach focuses on core features that deliver maximum value, allowing you to test your concept quickly and efficiently.",
    },
    {
      question: "What metrics do you track during scaling?",
      answer:
        "We track key metrics including user acquisition cost, lifetime value, retention rates, and growth velocity. Our dashboard provides real-time insights into your startup's performance and growth trajectory.",
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          Questions, <span className="text-white/70">answered.</span>
        </h2>
        <p className="text-white/60 font-bold">
          Everything you need to know about building your startup
        </p>
      </div>
      <div className="space-y-2 font-bold">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
