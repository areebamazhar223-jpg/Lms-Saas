import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import "./FAQ.css";

const faqData = [
  {
    id: 1,
    question: "How do I enroll in a course?",
    answer:
      "Create an account, open a course, and choose Enroll. Paid courses continue through checkout; free courses use the free enrollment flow.",
  },
  {
    id: 2,
    question: "Will I receive a certificate after completing a course?",
    answer:
      "Certificate availability and any certificate fee are listed on each course before you enroll.",
  },
  {
    id: 3,
    question: "Can I access my courses after purchase?",
    answer:
      "Course access is available through your LearnSmart account. Sign in and open My Courses to continue learning.",
  },
  {
    id: 4,
    question: "Are the courses suitable for beginners?",
    answer:
      "Absolutely. We offer beginner, intermediate, and advanced courses with step-by-step learning paths.",
  },
  {
    id: 5,
    question: "How can I contact instructors or support?",
    answer:
      "Use the Contact page to reach the LearnSmart team with questions about courses or your account.",
  },
];

function FAQ() {
  const [active, setActive] = useState(null);

  const toggleFAQ = (id) => {
    setActive(active === id ? null : id);
  };

  return (
    <section className="faq">
      <div className="faq__container">

        <div className="faq__header">
          <span className="faq__badge">
            FAQ
          </span>

          <h2>
            Frequently Asked <span>Questions</span>
          </h2>

          <p>
            Find answers to the most common questions about our
            courses, certificates, and learning experience.
          </p>
        </div>

        <div className="faq__list">

          {faqData.map((item) => (

            <div className="faq__item" key={item.id}>

              <button
                className="faq__question"
                onClick={() => toggleFAQ(item.id)}
              >
                <span>{item.question}</span>

                {active === item.id ? (
                  <Minus size={20} />
                ) : (
                  <Plus size={20} />
                )}
              </button>

              {active === item.id && (
                <div className="faq__answer">
                  <p>{item.answer}</p>
                </div>
              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQ;
