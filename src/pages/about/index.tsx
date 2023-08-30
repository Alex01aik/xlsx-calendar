import React from 'react';
import pageStyles from '../styles.module.css';
import styles from './styles.module.css';

export type AboutPageProps = {};

const AboutPage: React.FC<AboutPageProps> = () => {
  return (
    <div className={pageStyles.page}>
      <h3 className={pageStyles.pageTitle}>About us</h3>
      <div className={pageStyles.pageBody}>
        <div className={styles.infoBlock}>
          <h6 className={styles.title}>What is Lorem Ipsum?</h6>
          <span className={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </span>
        </div>
        <div className={styles.infoBlock}>
          <h6 className={styles.title}>Why do we use it?</h6>
          <span className={styles.description}>
            It is a long established fact that a reader will be distracted by the readable content
            of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using &lsquo;Content here,
            content here&rsquo;, making it look like readable English.
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
