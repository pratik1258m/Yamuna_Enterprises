const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'dist/assets');

// Max width for web display — machine cards are max ~800px wide on screen
// We resize + re-encode as PNG with maximum compression
const targets = [
  { file: 'manufac-DH3fMvki.png',  maxWidth: 900  },
  { file: 'machine2-D9DTOsle.png', maxWidth: 900  },
  { file: 'b-b5DVaRL9.png',        maxWidth: 900  },
  { file: 'machine1-OsnCzLRz.png', maxWidth: 900  },
  { file: 'machine3-BNGtXMZo.png', maxWidth: 800  },
];

async function compress() {
  for (const { file, maxWidth } of targets) {
    const filePath = path.join(assetsDir, file);
    const tmpPath  = filePath + '.tmp.png';

    const beforeBytes = fs.statSync(filePath).size;

    await sharp(filePath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: false })
      .toFile(tmpPath);

    const afterBytes = fs.statSync(tmpPath).size;
    const saved = ((1 - afterBytes / beforeBytes) * 100).toFixed(1);

    if (afterBytes < beforeBytes) {
      fs.renameSync(tmpPath, filePath);
      console.log(`✅ ${file}: ${(beforeBytes/1024/1024).toFixed(2)}MB → ${(afterBytes/1024/1024).toFixed(2)}MB  (−${saved}%)`);
    } else {
      fs.unlinkSync(tmpPath);
      console.log(`⚠️  ${file}: already smaller than resized output — kept original.`);
    }
  }
  console.log('\nDone. All filenames unchanged — no HTML edits needed.');
}

compress().catch(err => { console.error(err); process.exit(1); });
