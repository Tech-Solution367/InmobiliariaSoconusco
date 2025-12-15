import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import fs from 'fs';

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll('file') as File[];

  if (!files || files.length === 0) {
    return NextResponse.json({ error: 'No files received.' }, { status: 400 });
  }

  const urls = [];
  const uploadDir = path.join(process.cwd(), 'public/uploads');

  // Ensure upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    // Sanitize filename
    const filename = Date.now() + '_' + file.name.replace(/\s+/g, '_');
    const filepath = path.join(uploadDir, filename);
    
    await writeFile(filepath, buffer);
    urls.push(`/uploads/${filename}`);
  }

  return NextResponse.json({ success: true, urls });
}
