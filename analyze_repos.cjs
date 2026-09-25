const fs = require('fs');
const path = require('path');

const reposDir = 'C:\\Projects\\repos';
const repos = ["Geo-Watch", "AASHA", "WardWatch", "Globe-Trotter", "Mind-Meal", "StaySplit", "DISPATCHOPS", "Drill-Insight", "Mob-Alert", "GitGo", "Arch-Flow"];

function parseReadmeSections(markdown) {
  const sections = {};
  let currentHeader = 'Overview';
  sections[currentHeader] = [];

  const lines = markdown.split('\n');
  for (let line of lines) {
    if (line.match(/^#{1,3}\s+(.*)/)) {
      currentHeader = line.match(/^#{1,3}\s+(.*)/)[1].trim();
      sections[currentHeader] = [];
    } else {
      sections[currentHeader].push(line);
    }
  }

  const result = {};
  for (const [key, val] of Object.entries(sections)) {
    result[key.toLowerCase()] = val.join('\n').trim();
  }
  return result;
}

function findImages(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
      results = results.concat(findImages(filePath));
    } else {
      if (filePath.match(/\.(png|jpe?g|gif|svg)$/i)) {
        results.push(filePath);
      }
    }
  }
  return results;
}

const allProjects = [];

for (const repo of repos) {
  console.log(`Processing ${repo}...`);
  const repoPath = path.join(reposDir, repo);
  const readmePath = path.join(repoPath, 'README.md');
  let readme = '';
  if (fs.existsSync(readmePath)) {
    readme = fs.readFileSync(readmePath, 'utf8');
  }
  
  const sections = parseReadmeSections(readme);
  const images = findImages(repoPath).map(p => p.replace(reposDir + '\\', '').replace(/\\/g, '/'));
  
  const extractSection = (keywords) => {
    for (const key of Object.keys(sections)) {
      for (const kw of keywords) {
        if (key.includes(kw)) return sections[key];
      }
    }
    return null;
  };

  const project = {
    name: repo,
    slug: repo.toLowerCase(),
    category: ['Geo-Watch', 'AASHA', 'WardWatch', 'Globe-Trotter', 'Mind-Meal', 'StaySplit'].includes(repo) ? 'Web Apps' : 
              ['DISPATCHOPS', 'Drill-Insight', 'Mob-Alert'].includes(repo) ? 'AI / Intelligent Projects' : 'Developer Tools',
    github: `https://github.com/SujalPatil21/${repo}`,
    docs: `/projects/${repo.toLowerCase()}`,
    overview: extractSection(['overview', 'about', 'introduction', 'what is']) || '',
    problem: extractSection(['problem', 'challenge', 'why']) || '',
    solution: extractSection(['solution', 'approach']) || '',
    howItWorks: extractSection(['how it works', 'workflow', 'flow', 'usage']) || '',
    architectureDesc: extractSection(['architecture', 'system design']) || '',
    featuresText: extractSection(['feature']) || '',
    setup: extractSection(['setup', 'installation', 'run', 'getting started']) || '',
    performance: extractSection(['performance', 'benchmark', 'testing']) || '',
    limitations: extractSection(['limitations', 'future', 'todo']) || '',
    engineeringDetails: extractSection(['engineering', 'technical', 'implementation', 'api', 'database']) || '',
    allImages: images,
  };

  allProjects.push(project);
}

fs.writeFileSync('C:\\Projects\\parsed_repos.json', JSON.stringify(allProjects, null, 2));
