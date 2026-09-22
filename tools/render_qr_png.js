const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

(async () => {
  const assets = path.join(__dirname, '..', 'assets');
  for (const name of ['qr-free', 'qr-user-plus', 'qr-business-owner']) {
    const source = path.join(assets, `${name}.svg`);
    const output = path.join(assets, `${name}.png`);
    await sharp(fs.readFileSync(source), { density: 600 })
      .resize(1200, 1200, { kernel: 'nearest' })
      .png({ compressionLevel: 9, palette: true, colours: 2 })
      .toFile(output);
    console.log(`${name}.png`);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
