import './FAQSection.css';

const faqs = [
  {
    question: 'How do I enroll in a course?',
    answer: 'Create an account, choose a course from the catalog, and select Enroll. Free courses open right away; paid courses continue to checkout.',
  },
  {
    question: 'Can I study at my own pace?',
    answer: 'Yes. You can access your enrolled course lessons on your schedule and continue from where you left off.',
  },
  {
    question: 'Will I receive a certificate after finishing a course?',
    answer: 'Courses that include a certificate show the completion requirements on their course page. Finish the required lessons to receive it.',
  },
  {
    question: 'Are there free courses available?',
    answer: 'Yes. Browse the course catalog and look for courses marked Free to start learning without a purchase.',
  },
  {
    question: 'How can I reset my password?',
    answer: 'Choose Forgot Password on the login page and follow the reset link sent to your registered email address.',
  },
];

export default function FAQSection() {
  return (
    <section className="dtlms-faq-section" id="faqs" aria-labelledby="faq-heading">
      <div className="dtlms-faq-container">
        <p className="dtlms-faq-eyebrow">NEED A HAND?</p>
        <h2 id="faq-heading">Frequently Asked Questions</h2>
        <span className="dtlms-faq-heading-rule" aria-hidden="true" />
        <p className="dtlms-faq-intro">Quick answers to help you get started with LearnSmart.</p>
        <div className="dtlms-faq-list">
          {faqs.map(({ question, answer }, index) => (
            <details className="dtlms-faq-item" key={question} open={index === 0}>
              <summary>{question}<span className="dtlms-faq-toggle" aria-hidden="true" /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
