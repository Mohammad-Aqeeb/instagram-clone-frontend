'use client';

import React, { useState } from 'react';
import styles from './SearchInput.module.css';

export default function SearchInput({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Search Instagram..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Search</button>
    </form>
  );
}
