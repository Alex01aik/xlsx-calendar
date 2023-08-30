import React, { useState } from 'react';
import pageStyles from '../styles.module.css';
import styles from './styles.module.css';
import emailjs from '@emailjs/browser';

export type ContactPageProps = {};

const ContactPage: React.FC<ContactPageProps> = () => {
  const [contactInfo, setContactInfo] = useState<{
    name: string;
    email: string;
    message: string;
  }>({
    name: '',
    email: '',
    message: '',
  });
  return (
    <div className={pageStyles.page}>
      <h3 className={pageStyles.pageTitle}>Contact</h3>
      <div className={`${pageStyles.pageBody} ${styles.contactPage}`}>
        <form
          className={styles.block}
          onSubmit={(e) => {
            e.preventDefault();

            const isEmptyField = Object.values(contactInfo).some((value) => value.length === 0);
            if (isEmptyField) {
              alert('Enter all values, please!');
            } else {
              emailjs
                .send(
                  process.env.REACT_APP_EMAILJS_SERVICE_ID ?? '',
                  process.env.REACT_APP_EMAILJS_TEMPLATE_ID ?? '',
                  {
                    from_name: contactInfo.name,
                    message: contactInfo.message,
                    email: contactInfo.email,
                  },
                  process.env.REACT_APP_EMAILJS_API_KEY,
                )
                .then(
                  () => {
                    alert(
                      `Hi, ${contactInfo.name}! Thanks for your message: "${contactInfo.message}". We contact with you by email ${contactInfo.email}.`,
                    );
                    setContactInfo({
                      name: '',
                      email: '',
                      message: '',
                    });
                  },
                  (error) => {
                    console.error(error.text);
                  },
                );
            }
          }}
        >
          <div className={styles.formItem}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              id="name"
              value={contactInfo.name}
              onChange={(e) => {
                setContactInfo({ ...contactInfo, name: e.target.value });
              }}
              className={styles.input}
              placeholder="Enter your name"
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              value={contactInfo.email}
              onChange={(e) => {
                setContactInfo({ ...contactInfo, email: e.target.value });
              }}
              className={styles.input}
              placeholder="Enter your email"
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="message" className={styles.label}>
              Message
            </label>
            <textarea
              id="message"
              value={contactInfo.message}
              onChange={(e) => {
                setContactInfo({ ...contactInfo, message: e.target.value });
              }}
              className={styles.input}
              placeholder="Your message here ..."
              rows={4}
            />
          </div>
          <button className={styles.button}>Submit</button>
        </form>
        <div className={`${styles.block} ${styles.descriptionWrapper}`}>
          <span className={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever since the 1500s
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
