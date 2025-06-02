'use client';

import { useState } from 'react';
import styles from './Home.module.css';
import FileList from './components/FileList';

export default function Home() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      alert('Файл загружен!');
    } catch (err) {
      alert('Ошибка: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Мой Google Drive</h1>
      </div>

      <div className={styles.uploadContainer}>
        <form onSubmit={handleSubmit}>
          <label className={styles.uploadArea}>
            <div className={styles.uploadIcon}>📁</div>
            <p>{file ? file.name : 'Перетащите файл или нажмите для выбора'}</p>
            <input
              type="file"
              className={styles.fileInput}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          <button
            type="submit"
            className={styles.button}
            disabled={!file || isUploading}
          >
            {isUploading ? 'Загрузка...' : 'Загрузить'}
          </button>
        </form>
      </div>

      <FileList />
    </div>
  );
}