const fs = require('fs');
const path = require('path');

const reposDir = 'C:\\Projects\\repos';
const outDir = 'C:\\Projects\\public\\docs';

const repos = ["Geo-Watch", "AASHA", "WardWatch", "Globe-Trotter", "Mind-Meal", "StaySplit", "DISPATCHOPS", "Drill-Insight", "Mob-Alert", "GitGo", "Arch-Flow"];

function findFiles(exts, dir, results = []) {
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
    }
  }
  return results;
}

function extractApis(javaFiles, pythonFiles, tsFiles) {
  let apis = [];
  javaFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    if (content.includes('@RestController') || content.includes('@Controller')) {
      const matches = content.match(/@(Get|Post|Put|Delete)Mapping\(['"](.*?)['"]/g);
      if (matches) {
        matches.forEach(m => {
          const method = m.match(/@(Get|Post|Put|Delete)/)[1].toUpperCase();
          const route = m.match(/\(['"](.*?)['"]/)[1];
          apis.push(`| ${method} | \`${route}\` | Backend Endpoint |`);
        });
      }
    }
  });
  
  pythonFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    const matches = content.match(/@(app|router)\.(get|post|put|delete)\(['"](.*?)['"]/g);
    if (matches) {
      matches.forEach(m => {
        const method = m.match(/\.(get|post|put|delete)/)[1].toUpperCase();
        const route = m.match(/\(['"](.*?)['"]/)[1];
        apis.push(`| ${method} | \`${route}\` | FastAPI Endpoint |`);
      });
    }
  });

  tsFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    if (content.includes('express()') || content.includes('Router()')) {
      const matches = content.match(/\.(get|post|put|delete)\(['"](.*?)['"]/g);
      if (matches) {
        matches.forEach(m => {
          const method = m.match(/\.(get|post|put|delete)/)[1].toUpperCase();
          const route = m.match(/\(['"](.*?)['"]/)[1];
          apis.push(`| ${method} | \`${route}\` | Express Endpoint |`);
        });
      }
    }
  });
  return [...new Set(apis)];
}

function extractDbSchema(javaFiles, pythonFiles) {
  let schemas = [];
  javaFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    if (content.includes('@Entity') || content.includes('@Table')) {
      const className = content.match(/public class (\w+)/);
      if (className) {
        const fields = [...content.matchAll(/private (\w+) (\w+);/g)].map(m => m[2]).join(', ');
        schemas.push(`**${className[1]}**: \`${fields || 'id, ...'}\``);
      }
    }
  });
  return [...new Set(schemas)];
}

function getTree(dir) {
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
    readDir(dir, 0);
    return tree;
}

for (const repo of repos) {
  const repoPath = path.join(reposDir, repo);
  
  // 1. Base Markdown (README + Architecture)
  const mds = findFiles(['.md'], repoPath).sort((a,b) => a.toLowerCase().endsWith('readme.md') ? -1 : 1);
  let mdContent = '';
  for (const md of mds) {
    if (md.toLowerCase().includes('pull_request')) continue;
    let content = fs.readFileSync(md, 'utf8');
    // rewrite images
    content = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, url) => {
      if (!url.startsWith('http')) {
        const cleanUrl = url.replace(/^\.\//, '');
        return `![${alt}](https://raw.githubusercontent.com/SujalPatil21/${repo}/main/${cleanUrl})`;
      }
      return match;
    });
    mdContent += content + '\n\n';
  }

  // 2. Extract technical artifacts
  const javaFiles = findFiles(['.java'], repoPath);
  const pythonFiles = findFiles(['.py'], repoPath);
  const tsFiles = findFiles(['.ts', '.js'], repoPath);
  
  const apis = extractApis(javaFiles, pythonFiles, tsFiles);
  const schemas = extractDbSchema(javaFiles, pythonFiles);

  let caseStudy = mdContent;

  if (apis.length > 0) {
    caseStudy += `\n\n## API Reference\n\n| Method | Endpoint | Description |\n|---|---|---|\n${apis.join('\n')}\n`;
  }

  if (schemas.length > 0) {
    caseStudy += `\n\n## Database Schema\n\nThe following entities were extracted from the data model:\n\n${schemas.map(s => '- ' + s).join('\n')}\n`;
  }

  // Docker
  const dockerCompose = findFiles(['docker-compose.yml'], repoPath);
  if (dockerCompose.length > 0) {
    caseStudy += `\n\n## Deployment & Infrastructure\n\nThe project uses Docker for containerized deployment.\n\n\`\`\`yaml\n${fs.readFileSync(dockerCompose[0], 'utf8').substring(0, 1000)}\n...\n\`\`\`\n`;
  }

  // Project Structure
  caseStudy += `\n\n## Project Structure\n\n\`\`\`\n${getTree(repoPath)}\n\`\`\`\n`;

  // Screenshots
  const images = findFiles(['.png', '.jpg', '.jpeg'], repoPath).map(i => i.replace(repoPath + '\\', '').replace(/\\/g, '/'));
  const uniqueImages = [...new Set(images)].filter(img => !img.includes('img.shields.io') && !img.includes('vite.svg') && !img.includes('react.svg') && !img.includes('favicon'));
  
  const remainingImages = uniqueImages.filter(img => !caseStudy.includes(img));
  if (remainingImages.length > 0) {
    caseStudy += `\n\n## Additional Visuals\n\n`;
    for (const img of remainingImages) {
      caseStudy += `![${path.basename(img)}](https://raw.githubusercontent.com/SujalPatil21/${repo}/main/${img})\n\n`;
    }
  }

  fs.writeFileSync(path.join(outDir, `${repo.toLowerCase()}.md`), caseStudy);
  console.log(`Generated Deep Case Study for ${repo}`);
}
