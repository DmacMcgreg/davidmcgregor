import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../shared';
import styles from './ContactForm.module.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFieldActive = (fieldName: string) => {
    return focusedField === fieldName || formData[fieldName as keyof FormData];
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Name Field */}
      <div className={styles.field}>
        <motion.label
          htmlFor="name"
          className={`${styles.label} ${isFieldActive('name') ? styles.active : ''}`}
          animate={{
            y: isFieldActive('name') ? -24 : 0,
            scale: isFieldActive('name') ? 0.85 : 1,
            color: isFieldActive('name') ? 'var(--accent)' : 'var(--muted)',
          }}
          transition={{ duration: 0.2 }}
        >
          Your Name
        </motion.label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          className={styles.input}
          required
        />
        <motion.span
          className={styles.underline}
          animate={{
            scaleX: focusedField === 'name' ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Email Field */}
      <div className={styles.field}>
        <motion.label
          htmlFor="email"
          className={`${styles.label} ${isFieldActive('email') ? styles.active : ''}`}
          animate={{
            y: isFieldActive('email') ? -24 : 0,
            scale: isFieldActive('email') ? 0.85 : 1,
            color: isFieldActive('email') ? 'var(--accent)' : 'var(--muted)',
          }}
          transition={{ duration: 0.2 }}
        >
          Email Address
        </motion.label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          className={styles.input}
          required
        />
        <motion.span
          className={styles.underline}
          animate={{
            scaleX: focusedField === 'email' ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Message Field */}
      <div className={styles.field}>
        <motion.label
          htmlFor="message"
          className={`${styles.label} ${isFieldActive('message') ? styles.active : ''}`}
          animate={{
            y: isFieldActive('message') ? -24 : 0,
            scale: isFieldActive('message') ? 0.85 : 1,
            color: isFieldActive('message') ? 'var(--accent)' : 'var(--muted)',
          }}
          transition={{ duration: 0.2 }}
        >
          Your Message
        </motion.label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          className={`${styles.input} ${styles.textarea}`}
          rows={5}
          required
        />
        <motion.span
          className={styles.underline}
          animate={{
            scaleX: focusedField === 'message' ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Submit Button */}
      <div className={styles.submit}>
        <MagneticButton
          variant="primary"
          size="lg"
          cursorText={status === 'submitting' ? '' : 'Send'}
        >
          {status === 'submitting' ? (
            <span className={styles.loading}>Sending...</span>
          ) : (
            'Send Message'
          )}
        </MagneticButton>
      </div>

      {/* Status Messages */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            className={`${styles.statusMessage} ${styles.success}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Thanks for reaching out! I'll get back to you soon.
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            className={`${styles.statusMessage} ${styles.error}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Something went wrong. Please try again.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
