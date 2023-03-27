import React from 'react';
import styles from './spinner.module.css'

const Spinner: React.FC = () => {
  return <div className={`${styles.loader}`}>Loading...</div>;
}

export default Spinner;