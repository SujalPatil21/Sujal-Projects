const fs = require('fs');
const path = require('path');

const reposDir = 'C:\\Projects\\repos';
const outPath = 'C:\\Projects\\src\\data\\projects.ts';

const repos = ["Geo-Watch", "AASHA", "WardWatch", "Globe-Trotter", "Mind-Meal", "StaySplit", "DISPATCHOPS", "Drill-Insight", "Mob-Alert", "GitGo", "Arch-Flow"];

// Basic predefined metadata (to merge with extracted)
const baseProjects = [
  { slug: 'geo-watch', category: 'Web Apps', github: 'https://github.com/SujalPatil21/Geo-Watch', docs: '/projects/geo-watch', name: 'Geo-Watch', live: 'https://geowatch.vercel.app' },
  { slug: 'aasha', category: 'Web Apps', github: 'https://github.com/SujalPatil21/AASHA', docs: '/projects/aasha', name: 'AASHA' },
  { slug: 'wardwatch', category: 'Web Apps', github: 'https://github.com/SujalPatil21/WardWatch', docs: '/projects/wardwatch', name: 'WardWatch', live: 'https://ward-watch.vercel.app/' },
  { slug: 'globe-trotter', category: 'Web Apps', github: 'https://github.com/SujalPatil21/Globe-Trotter', docs: '/projects/globe-trotter', name: 'Globe-Trotter' },
  { slug: 'mind-meal', category: 'Web Apps', github: 'https://github.com/SujalPatil21/Mind-Meal', docs: '/projects/mind-meal', name: 'Mind-Meal' },
  { slug: 'staysplit', category: 'Web Apps', github: 'https://github.com/SujalPatil21/StaySplit', docs: '/projects/staysplit', name: 'StaySplit' },
  { slug: 'dispatchops', category: 'Developer Tools', github: 'https://github.com/SujalPatil21/DISPATCHOPS', docs: '/projects/dispatchops', name: 'DISPATCHOPS' },
  { slug: 'drill-insight', category: 'Data Science & AI', github: 'https://github.com/SujalPatil21/Drill-Insight', docs: '/projects/drill-insight', name: 'Drill-Insight' },
  { slug: 'mob-alert', category: 'Web Apps', github: 'https://github.com/SujalPatil21/Mob-Alert', docs: '/projects/mob-alert', name: 'Mob-Alert' },
  { slug: 'gitgo', category: 'Developer Tools', github: 'https://github.com/SujalPatil21/GitGo', docs: '/projects/gitgo', name: 'GitGo' },
  { slug: 'arch-flow', category: 'Web Apps', github: 'https://github.com/SujalPatil21/Arch-Flow', docs: '/projects/arch-flow', name: 'Arch-Flow' }
];

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
    try {
      const content = fs.readFileSync(f, 'utf8');
      if (content.includes('@RestController') || content.includes('@Controller')) {
        const matches = content.match(/@(Get|Post|Put|Delete)Mapping\(['"](.*?)['"]/g);
        if (matches) {
          matches.forEach(m => {
            const method = m.match(/@(Get|Post|Put|Delete)/)[1].toUpperCase();
            const route = m.match(/\(['"](.*?)['"]/)[1];
            apis.push({ method, endpoint: route, purpose: 'Backend Endpoint' });
          });
        }
      }
    } catch(e) {}
  });
  
  pythonFiles.forEach(f => {
    try {
      const content = fs.readFileSync(f, 'utf8');
      const matches = content.match(/@(app|router)\.(get|post|put|delete)\(['"](.*?)['"]/g);
      if (matches) {
        matches.forEach(m => {
          const method = m.match(/\.(get|post|put|delete)/)[1].toUpperCase();
          const route = m.match(/\(['"](.*?)['"]/)[1];
          apis.push({ method, endpoint: route, purpose: 'API Endpoint' });
        });
      }
    } catch(e) {}
  });
  
  // Deduplicate
  const uniqueApis = [];
  const seen = new Set();
  apis.forEach(a => {
    const key = a.method + a.endpoint;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueApis.push(a);
    }
  });
  return uniqueApis;
}

function extractDbSchema(javaFiles, pythonFiles) {
  let schemas = [];
  javaFiles.forEach(f => {
    try {
      const content = fs.readFileSync(f, 'utf8');
      if (content.includes('@Entity') || content.includes('@Table')) {
        const className = content.match(/public class (\w+)/);
        if (className) {
          const fields = [...content.matchAll(/private [A-Za-z<>]+ (\w+);/g)].map(m => m[1]);
          schemas.push({ entity: className[1], fields: fields.length > 0 ? fields : ['id'] });
        }
      }
    } catch(e){}
  });
  return schemas;
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
    try {
        readDir(dir, 0);
    } catch(e) {}
    return tree;
}

function extractFromMarkdown(mds) {
  let content = '';
  mds.forEach(md => {
    try { content += fs.readFileSync(md, 'utf8') + '\n\n'; } catch(e){}
  });

  const extractSection = (regex, fallback = '') => {
    const match = content.match(regex);
    return match ? match[1].trim() : fallback;
  };

  // Basic heuristical parsing
  let overview = extractSection(/## (?:Overview|About)([\s\S]*?)(?:##|$)/i, "A technical project.");
  // Clean up shields, HTML tags, and raw markdown tags
  overview = overview.replace(/<[^>]+>/g, '').replace(/!\[.*?\]\(.*?\)/g, '').trim();

  let problemsStr = extractSection(/## (?:Problem|Challenges)([\s\S]*?)(?:##|$)/i, "");
  let problem = problemsStr.split('\n').map(l => l.replace(/^[-*]\s*/, '').trim()).filter(l => l.length > 5 && l.length < 150);
  if (problem.length === 0) problem = ["Addressing inefficient operations and lack of real-time insights.", "Replacing manual and scattered data processing."];

  let solution = extractSection(/## (?:Solution|Approach)([\s\S]*?)(?:##|$)/i, "A streamlined platform addressing the core challenges.");
  solution = solution.replace(/<[^>]+>/g, '').replace(/!\[.*?\]\(.*?\)/g, '').trim();

  let featuresStr = extractSection(/## (?:Features|Key Features)([\s\S]*?)(?:##|$)/i, "");
  let featureLines = featuresStr.split('\n').filter(l => l.trim().startsWith('-') || l.trim().startsWith('*'));
  let features = featureLines.map(l => {
    let text = l.replace(/^[-*]\s*/, '').trim();
    let title = text.split(':')[0] || text.substring(0, 30);
    let desc = text.includes(':') ? text.split(':')[1].trim() : text;
    return { title: title.replace(/\*\*/g, ''), description: desc.replace(/\*\*/g, '') };
  });

  let archImage = null;
  const imageMatch = content.match(/!\[.*?\]\((.*?architecture.*?|.*?diagram.*?)\)/i);
  if (imageMatch) {
    archImage = imageMatch[1];
    if (archImage.startsWith('.')) archImage = archImage.replace(/^\.\/?/, '');
  }

  let stack = { frontend: [], backend: [], database: [], infrastructure: [] };
  if (content.toLowerCase().includes('react')) stack.frontend.push('React');
  if (content.toLowerCase().includes('vite')) stack.frontend.push('Vite');
  if (content.toLowerCase().includes('tailwind')) stack.frontend.push('Tailwind CSS');
  if (content.toLowerCase().includes('spring boot')) stack.backend.push('Spring Boot');
  if (content.toLowerCase().includes('express') || content.toLowerCase().includes('node.js')) stack.backend.push('Node.js');
  if (content.toLowerCase().includes('fastapi')) stack.backend.push('FastAPI');
  if (content.toLowerCase().includes('postgres')) stack.database.push('PostgreSQL');
  if (content.toLowerCase().includes('mongo')) stack.database.push('MongoDB');
  if (content.toLowerCase().includes('redis')) stack.database.push('Redis');
  if (content.toLowerCase().includes('docker')) stack.infrastructure.push('Docker');
  if (content.toLowerCase().includes('websocket')) stack.infrastructure.push('WebSockets');

  return { overview, problem, solution, features, architecture: { image: archImage, description: "System architecture design.", components: [] }, stack };
}

const finalData = [];

for (const repo of repos) {
  const repoPath = path.join(reposDir, repo);
  const base = baseProjects.find(p => p.name === repo);
  
  const mds = findFiles(['.md'], repoPath).sort((a,b) => a.toLowerCase().endsWith('readme.md') ? -1 : 1).slice(0, 3);
  
  const javaFiles = findFiles(['.java'], repoPath);
  const pythonFiles = findFiles(['.py'], repoPath);
  const tsFiles = findFiles(['.ts', '.js'], repoPath);
  
  const apis = extractApis(javaFiles, pythonFiles, tsFiles);
  const database = extractDbSchema(javaFiles, pythonFiles);
  const projectStructure = getTree(repoPath);

  const images = findFiles(['.png', '.jpg', '.jpeg', '.gif'], repoPath).map(i => i.replace(repoPath + '\\', '').replace(/\\/g, '/'));
  let uniqueImages = [...new Set(images)].filter(img => !img.includes('img.shields.io') && !img.includes('vite.svg') && !img.includes('react.svg') && !img.includes('favicon'));
  
  // Transform local image paths to absolute GitHub URLs
  uniqueImages = uniqueImages.map(img => `https://raw.githubusercontent.com/SujalPatil21/${repo}/main/${img}`);

  const mdData = extractFromMarkdown(mds);
  
  if (mdData.architecture.image && !mdData.architecture.image.startsWith('http')) {
      mdData.architecture.image = `https://raw.githubusercontent.com/SujalPatil21/${repo}/main/${mdData.architecture.image}`;
  }

  // Find a fallback arch image from unique images if regex failed
  if (!mdData.architecture.image) {
      const archFallback = uniqueImages.find(img => img.toLowerCase().includes('architecture') || img.toLowerCase().includes('diagram') || img.toLowerCase().includes('flow'));
      if (archFallback) {
          mdData.architecture.image = archFallback;
          uniqueImages = uniqueImages.filter(img => img !== archFallback);
      }
  }

  // Take only a subset of distinct screenshots to prevent gallery spam
  // Prefer files named 'dashboard', 'home', etc.
  uniqueImages = uniqueImages.slice(0, 6);

  finalData.push({
    ...base,
    description: mdData.overview.substring(0, 150) + '...',
    stack: mdData.stack,
    overview: mdData.overview.substring(0, 500) + (mdData.overview.length > 500 ? '...' : ''),
    problem: mdData.problem.slice(0, 4),
    solution: mdData.solution.substring(0, 500),
    features: mdData.features.slice(0, 6),
    architecture: mdData.architecture,
    apis: apis.slice(0, 15),
    database: database.slice(0, 10),
    projectStructure: projectStructure,
    screenshots: uniqueImages
  });
  console.log(`Processed ${repo}`);
}

const fileContent = `export interface Project {
  name: string;
  slug: string;
  category: string;
  description: string;
  github: string;
  live?: string;
  docs?: string;
  stack: {
    frontend: string[];
    backend: string[];
    database: string[];
    infrastructure: string[];
  };
  overview: string;
  problem: string[];
  solution: string;
  features: { title: string; description: string }[];
  architecture: {
    image: string | null;
    description: string;
    components: string[];
  };
  apis: { method: string; endpoint: string; purpose: string }[];
  database: { entity: string; fields: string[] }[];
  projectStructure: string;
  screenshots: string[];
}

export const projects: Project[] = ${JSON.stringify(finalData, null, 2)};
`;

fs.writeFileSync(outPath, fileContent);
console.log('Successfully wrote strictly structured projects.ts');
