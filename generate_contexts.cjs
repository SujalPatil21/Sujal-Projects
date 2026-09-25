const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const reposDir = 'C:\\Projects\\repos';
const outDir = 'C:\\Projects\\repo_contexts';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

const repos = ["Geo-Watch", "AASHA", "WardWatch", "Globe-Trotter", "Mind-Meal", "StaySplit", "DISPATCHOPS", "Drill-Insight", "Mob-Alert", "GitGo", "Arch-Flow"];

function getTree(dir) {
  try {
    // using powershell tree or just read recursively
    let result = '';
    const readDir = (currentDir, depth) => {
      if (depth > 3) return;
      const files = fs.readdirSync(currentDir);
      for (const file of files) {
        if (file === '.git' || file === 'node_modules' || file === 'target' || file === 'build') continue;
        const fullPath = path.join(currentDir, file);
        const stat = fs.statSync(fullPath);
        result += '  '.repeat(depth) + file + (stat.isDirectory() ? '/' : '') + '\n';
        if (stat.isDirectory()) {
          readDir(fullPath, depth + 1);
        }
      }
    };
    readDir(dir, 0);
    return result;
  } catch (e) {
    return 'Tree error';
  }
}

for (const repo of repos) {
  const repoPath = path.join(reposDir, repo);
  let context = `--- REPOSITORY: ${repo} ---\n\n`;
  
  context += `--- DIRECTORY STRUCTURE ---\n${getTree(repoPath)}\n\n`;

  const findFiles = (exts, dir, results = []) => {
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (['.git', 'node_modules', 'target', 'build', 'dist', '.next'].includes(file)) continue;
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        findFiles(exts, fullPath, results);
      } else {
        if (exts.some(ext => file.toLowerCase().endsWith(ext))) {
          results.push(fullPath);
        }
        if (['package.json', 'pom.xml', 'docker-compose.yml', 'dockerfile', 'requirements.txt', 'pyproject.toml'].includes(file.toLowerCase())) {
          results.push(fullPath);
        }
      }
    }
    return results;
  };

  const filesToRead = findFiles(['.md', '.sql'], repoPath);
  // filter duplicates
  const uniqueFiles = [...new Set(filesToRead)];

  for (const file of uniqueFiles) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const relPath = path.relative(repoPath, file);
      // skip large package-lock etc if accidentally included
      if (content.length > 50000) continue; 
      context += `--- FILE: ${relPath} ---\n${content}\n\n`;
    } catch(e) {}
  }

  // Find images/screenshots
  const images = findFiles(['.png', '.jpg', '.jpeg', '.svg', '.gif'], repoPath);
  context += `--- IMAGES DISCOVERED ---\n${images.map(img => path.relative(repoPath, img)).join('\n')}\n\n`;

  fs.writeFileSync(path.join(outDir, `${repo}.txt`), context);
}

console.log('Context files generated');
