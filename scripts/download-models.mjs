import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const modelsDir = path.join(rootDir, 'public', 'models');

if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

const MODELS = [
  {
    name: 'human_muscles.glb',
    url: 'https://raw.githubusercontent.com/Nurkan1/Anatria-3D/main/public/anatomy/muscular_male.glb',
    description: '完整男性人體肌肉解剖模型 (來源: Z-Anatomy / BodyParts3D, CC BY-SA 4.0)',
  },
  {
    name: 'skeletal_male.glb',
    url: 'https://raw.githubusercontent.com/Nurkan1/Anatria-3D/main/public/anatomy/skeletal_male.glb',
    description: '完整人體骨骼架構模型 (來源: Z-Anatomy, CC BY-SA 4.0)',
  },
];

async function downloadFile(url, destPath, description) {
  console.log(`\n[下載中] ${description}`);
  console.log(`來源 URL: ${url}`);
  console.log(`目標路徑: ${destPath}`);

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`下載失敗，HTTP 狀態碼: ${res.statusCode}`));
          return;
        }

        const totalBytes = parseInt(res.headers['content-length'] || '0', 10);
        let downloadedBytes = 0;

        res.on('data', (chunk) => {
          downloadedBytes += chunk.length;
          file.write(chunk);
          if (totalBytes > 0) {
            const percent = ((downloadedBytes / totalBytes) * 100).toFixed(1);
            process.stdout.write(`\r進度: ${percent}% (${(downloadedBytes / 1048576).toFixed(2)} MB / ${(totalBytes / 1048576).toFixed(2)} MB)`);
          }
        });

        res.on('end', () => {
          file.end();
          console.log(`\n[完成] 成功下載至 ${destPath}`);
          resolve();
        });
      })
      .on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
  });
}

async function main() {
  console.log('=== IronMesh 3D 模型自動下載工具 ===');
  for (const model of MODELS) {
    const dest = path.join(modelsDir, model.name);
    if (fs.existsSync(dest)) {
      const stats = fs.statSync(dest);
      if (stats.size > 100000) {
        console.log(`\n[已存在] ${model.name} (大小: ${(stats.size / 1048576).toFixed(2)} MB)，略過下載。`);
        continue;
      }
    }
    try {
      await downloadFile(model.url, dest, model.description);
    } catch (e) {
      console.error(`下載 ${model.name} 失敗:`, e.message);
    }
  }
  console.log('\n=== 所有模型就緒 ===\n');
}

main();
