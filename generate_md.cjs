const fs = require('fs');
const path = require('path');

const reposDir = 'C:\\Projects\\repos';
const outDir = 'C:\\Projects\\public\\docs';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const repos = ["Geo-Watch", "AASHA", "WardWatch", "Globe-Trotter", "Mind-Meal", "StaySplit", "DISPATCHOPS", "Drill-Insight", "Mob-Alert", "GitGo", "Arch-Flow"];

function getImages(repoPath) {
  const images = [];
  const findFiles = (dir) => {
    if (!fs.existsSync(dir)) return;
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (['.git', 'node_modules'].includes(file)) continue;
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        findFiles(fullPath);
      } else if (/\.(png|jpe?g|gif|svg)$/i.test(file)) {
        images.push(fullPath.replace(repoPath + '\\', '').replace(/\\/g, '/'));
      }
    }
  };
  findFiles(repoPath);
  return images.filter(img => !img.includes('img.shields.io') && !img.includes('vite.svg') && !img.includes('react.svg') && !img.includes('favicon') && !img.includes('appiconset') && !img.includes('mipmap'));
}

function getMarkdownFiles(repoPath) {
  const mds = [];
  const findFiles = (dir) => {
    if (!fs.existsSync(dir)) return;
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (['.git', 'node_modules'].includes(file)) continue;
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        findFiles(fullPath);
      } else if (file.toLowerCase().endsWith('.md')) {
        mds.push(fullPath);
      }
    }
  };
  findFiles(repoPath);
  // Sort README.md first
  return mds.sort((a, b) => {
    if (a.toLowerCase().endsWith('readme.md')) return -1;
    if (b.toLowerCase().endsWith('readme.md')) return 1;
    return 0;
  });
}

function processMarkdown(content, repo) {
  // Rewrite local image links to absolute GitHub raw links
  const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
  return content.replace(imageRegex, (match, alt, url) => {
    if (!url.startsWith('http')) {
      const cleanUrl = url.replace(/^\.\//, '');
      return `![${alt}](https://raw.githubusercontent.com/SujalPatil21/${repo}/main/${cleanUrl})`;
    }
    return match;
  });
}

for (const repo of repos) {
  const repoPath = path.join(reposDir, repo);
  const mds = getMarkdownFiles(repoPath);
  
  let combinedMd = '';
  
  for (const md of mds) {
    const content = fs.readFileSync(md, 'utf8');
    // Skip very small files that might just be templates
    if (content.length < 50 && md.toLowerCase().includes('pull_request')) continue;
    
    let processed = processMarkdown(content, repo);
    
    // Add file title if it's not the README to separate sections nicely
    if (!md.toLowerCase().endsWith('readme.md')) {
      const name = path.basename(md, '.md');
      combinedMd += `\n\n## --- Documentation: ${name} ---\n\n`;
    }
    
    combinedMd += processed + '\n\n';
  }

  // Find stray screenshots that weren't included in the markdown
  const images = getImages(repoPath);
  if (images.length > 0) {
    combinedMd += `\n\n## Screenshots & Assets\n\n`;
    const uniqueImages = [...new Set(images)];
    for (const img of uniqueImages) {
      // Don't add if already in the markdown
      if (!combinedMd.includes(img)) {
        combinedMd += `![${path.basename(img)}](https://raw.githubusercontent.com/SujalPatil21/${repo}/main/${img})\n\n`;
      }
    }
  }

  // Also extract directory structure
  combinedMd += `\n\n## Project Structure\n\n\`\`\`\n`;
  try {
     let tree = '';
     const readDir = (currentDir, depth) => {
      if (depth > 2) return;
      const files = fs.readdirSync(currentDir);
      for (const file of files) {
        if (['.git', 'node_modules', 'target', 'build', 'dist', '.next'].includes(file)) continue;
        const fullPath = path.join(currentDir, file);
        const stat = fs.statSync(fullPath);
        tree += '  '.repeat(depth) + file + (stat.isDirectory() ? '/' : '') + '\n';
        if (stat.isDirectory()) readDir(fullPath, depth + 1);
      }
    };
    readDir(repoPath, 0);
    combinedMd += tree;
  } catch(e) {}
  combinedMd += `\`\`\`\n`;

  fs.writeFileSync(path.join(outDir, `${repo.toLowerCase()}.md`), combinedMd);
  console.log(`Wrote docs for ${repo}`);
}
