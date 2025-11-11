const fs = require('fs');
const path = require('path');

const publicImgDir = path.join(__dirname, '..', 'public', 'img');
const productsFile = path.join(__dirname, '..', 'src', 'data', 'products.json');

const files = fs.readdirSync(publicImgDir);
const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));

const fileSet = new Set(files);

let missing = [];
let duplicates = {};

products.forEach(p => {
  if (p.images && p.images.length) {
    const img = p.images[0];
    if (!fileSet.has(path.basename(img))) {
      missing.push({ id: p.id, title: p.title, image: img });
    }
    duplicates[img] = (duplicates[img] || 0) + 1;
  }
});

console.log('Files in public/img:', files.length);
console.log('Products checked:', products.length);

if (missing.length) {
  console.log('\nMissing image references (in products.json but not in public/img):');
  missing.forEach(m => console.log(`${m.id} - ${m.title} -> ${m.image}`));
} else {
  console.log('\nNo missing image references.');
}

const reused = Object.entries(duplicates).filter(([k,v]) => v>1);
if (reused.length) {
  console.log('\nImages referenced by multiple products:');
  reused.forEach(([k,v]) => console.log(`${k} referenced ${v} times`));
} else {
  console.log('\nNo reused image references.');
}
