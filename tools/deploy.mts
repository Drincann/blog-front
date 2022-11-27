import { exec } from 'child_process';
import path from 'path';
import tar from 'tar';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { env } from 'process';
import { existsSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deploy = async () => {
  try {
    await new Promise((resolve, reject) => exec('npm run build', {}, e => {
      if (e) return reject(e);
      resolve(null);
    }));
  } catch (e) {
    console.error(e);
    console.error('Build failed');
    return;
  }
  console.log('Build success');

  const bundlePath = path.resolve(__dirname, `../bundle${Date.now()}.tar.gz`);
  try {
    await tar.c(
      {
        gzip: true,
        file: bundlePath,
      },
      ['build'],
    );
  } catch (e) {
    console.error(e);
    console.error('Compress failed');
    return;
  }

  console.log('Compress success to', bundlePath);

  try {
    const host = env['BLOG_RELEASE_HOST'] || 'codingfor.life';
    const token = env['BLOG_RELEASE_TOKEN'] || (existsSync(path.resolve(__dirname, '../.token')) && readFileSync(path.resolve(__dirname, '../.token'), 'utf-8'));
    if (typeof token !== 'string') throw new Error('No token');
    console.log('Deploying to', host);
    const bundleInBase64 = readFileSync(bundlePath, 'base64');
    console.log('Bundle size', bundleInBase64.length);
    const { code, message, data } = (await axios.post(`http://${host}/api/v1/deploy`, { bundle: bundleInBase64, token }))?.data;
    if (code !== 0) {
      console.error('Deploy failed', message);
      return;
    }
    console.log('Deploy success', data);
  } catch (e) {
    console.error(e);
    console.error('Deploy failed');
    return;
  }
}
deploy();