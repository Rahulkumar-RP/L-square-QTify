import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./FAQ.module.css";

function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    axios.get("https://qtify-backend.labs.crio.do/faq")
      .then((res) => setFaqs(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.faqSection}>
      <h2 className={styles.title}>FAQs</h2>
      <div className={styles.list}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.item}>
            <button
              className={styles.question}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span>{faq.question}</span>
              <span className={styles.icon}>
                {openIndex === index ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 15L12 9L6 15" stroke="#34C94B" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="#34C94B" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </span>
            </button>
            {openIndex === index && (
              <div className={styles.answer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;