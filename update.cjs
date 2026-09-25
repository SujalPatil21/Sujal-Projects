const fs = require('fs');

const file = 'src/data/projects.ts';
let content = fs.readFileSync(file, 'utf8');

// Arch-Flow Architecture fix
content = content.replace(/image:\s*'https:\/\/raw\.githubusercontent\.com\/SujalPatil21\/Arch-Flow\/main\/1\.png'/, 'image: null');
content = content.replace(/screenshots:\s*\[\s*'https:\/\/raw\.githubusercontent\.com\/SujalPatil21\/Arch-Flow\/main\/2\.png',\s*'https:\/\/raw\.githubusercontent\.com\/SujalPatil21\/Arch-Flow\/main\/3\.png'\s*\]/, 'screenshots: [\'https://raw.githubusercontent.com/SujalPatil21/Arch-Flow/main/1.png\']');

// GitGo Marketplace
content = content.replace(/github:\s*'https:\/\/github\.com\/SujalPatil21\/GitGo'/, 'github: \'https://github.com/SujalPatil21/GitGo\',\n    live: \'https://marketplace.visualstudio.com/items?itemName=RuntimeSync.gitgo\'');

// AASHA remove Python, FastAPI
content = content.replace(/backend:\s*\['Spring Boot',\s*'Python',\s*'FastAPI'\]/, 'backend: [\'Spring Boot\', \'Java\']');

// Globe-Trotter Backend Node.js -> Python
content = content.replace(/(slug:\s*'globe-trotter'[\s\S]*?backend:\s*\[)'Node\.js'(\])/, '$1\'Python\'$2');

// Mind-Meal Backend Node.js -> Python
content = content.replace(/(slug:\s*'mind-meal'[\s\S]*?backend:\s*\[)'Node\.js'(\])/, '$1\'Python\'$2');

// StaySplit Backend Node.js -> Spring Boot, Java
content = content.replace(/(slug:\s*'staysplit'[\s\S]*?backend:\s*\[)'Node\.js'(\])/, '$1\'Spring Boot\', \'Java\'$2');

// Arch-Flow Add Python to Backend
content = content.replace(/(slug:\s*'arch-flow'[\s\S]*?backend:\s*\[)([^\]]+)(\])/, '$1$2, \'Python\'$3');

// Truncate all screenshots to exactly ONE screenshot per project
const matches = [...content.matchAll(/screenshots:\s*\[([\s\S]*?)\]/g)];
for (const match of matches) {
  const arrStr = match[1];
  const items = arrStr.split(',').map(s => s.trim()).filter(s => s.length > 0 && s.startsWith('\''));
  if (items.length > 1) {
    const single = 'screenshots: [' + items[0] + ']';
    content = content.replace(match[0], single);
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log('done');
