import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const uploadDir = path.resolve('/home/vladimir/Documents'); // Укажите корректный путь
  try {
    const files = await fs.readdir(uploadDir);
    res.status(200).json({ files });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}