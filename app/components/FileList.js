import { useEffect, useState } from 'react';
import styles from '../Home.module.css';

export default function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('/api/files')
      .then((res) => res.json())
      .then((data) => setFiles(data.files || []));
  }, []);

  return (
    <div className={styles.fileList}>
      <h2>Мои файлы</h2>
      {files.length === 0 ? (
        <p>Нет загруженных файлов</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file}>
              <span>{file}</span>
              <a href={`/api/download?file=${file}`} download>Скачать</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}