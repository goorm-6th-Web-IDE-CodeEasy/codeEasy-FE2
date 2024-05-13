import React from 'react';
import styles from './SkeletonLoader.module.scss';

const SkeletonLoader = () => {
    return (
        <div className={styles.skeleton}>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={styles.skeletonRow}>
                    <div className={styles.skeletonCell}></div>
                    <div className={styles.skeletonCell}></div>
                    <div className={styles.skeletonCell}></div>
                    <div className={styles.skeletonCell}></div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
