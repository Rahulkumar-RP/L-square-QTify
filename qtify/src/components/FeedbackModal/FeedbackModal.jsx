import React, { useState } from "react";
import styles from "./FeedbackModal.module.css";

function FeedbackModal({ onClose }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Feedback submitted!");
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Feedback</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <input
          className={styles.input}
          type="text"
          name="fullName"
          placeholder="Full name"
          value={form.fullName}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email ID"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />
        <textarea
          className={styles.textarea}
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={5}
        />
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Submit Feedback
        </button>
      </div>
    </div>
  );
}

export default FeedbackModal;