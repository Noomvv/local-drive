import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs-extra';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const uploadDir = path.resolve('./public/uploads'); // Укажите корректный путь
  await fs.ensureDir(uploadDir);

  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true, // Сохранять расширения файлов
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: err.message });
    }

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    res.status(200).json({ files });
  });
}