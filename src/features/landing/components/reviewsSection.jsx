import React from 'react';
import styles from './reviewsSection.module.css';

const ReviewCard = ({ name, role, text }) => (
  <div className={styles.reviewCard}>
    <p className={styles.reviewText}>"{text}"</p>
    <div className={styles.reviewAuthor}>
      <div className={styles.avatar}>
        {name.charAt(0)}
      </div>
      <div>
        <h4 className={styles.authorName}>{name}</h4>
        <p className={styles.authorRole}>{role}</p>
      </div>
    </div>
  </div>
);

const LoadingCard = () => (
  <div className={styles.loadingCard}>
    <div className={styles.loadingTextLine}></div>
    <div className={styles.loadingTextLine}></div>
    <div className={styles.loadingAvatar}></div>
  </div>
);

const ReviewsSection = ({ reviews = [], loading = false }) => {
  return (
    <section className={styles.reviewsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleUnderline}>NUESTROS USUARIOS OPINAN</span>
        </h2>
        
        {loading ? (
          <div className={styles.grid}>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : (
          <div className={styles.grid}>
            {reviews.map((review) => (
              <ReviewCard 
                key={review.id} 
                name={review.name} 
                role={review.role} 
                text={review.text} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;