const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    let f = path.join(dir, file);
    const stat = fs.statSync(f);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(f));
    } else if (f.endsWith('.jsx')) {
      results.push(f);
    }
  });
  return results;
}
const files = walk('c:/Users/abhit/.gemini/antigravity/scratch/portfolio/src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/rgba\(255,255,255,/g, 'rgba(var(--color-white-rgb),');
  content = content.replace(/'#fff'/g, '"var(--color-white)"');
  content = content.replace(/"#fff"/g, '"var(--color-white)"');
  content = content.replace(/rgba\(5,5,16,/g, 'rgba(var(--color-dark-rgb),');
  content = content.replace(/rgba\(15,15,30,/g, 'rgba(var(--color-dark-rgb),');
  fs.writeFileSync(file, content);
});
console.log('Replaced colors in JSX files');
