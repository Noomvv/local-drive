import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req, res) {
  const { file } = req.query;
  const filePath = path.join('/path/to/your/storage', file);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Файл не найден' });
  }

  res.setHeader('Content-Disposition', `attachment; filename=${file}`);
  res.setHeader('Content-Type', 'application/octet-stream');
  fs.createReadStream(filePath).pipe(res);
}