const fs = require('fs');
const data = JSON.parse(fs.readFileSync('repo_data.json', 'utf8'));

const analysis = data.map(repoObj => {
  const repo = repoObj.repo;
  const files = repoObj.files;
  const readme = (files['README.md'] || '').toLowerCase();
  
  let tech = new Set();
  
  const keywords = {
    'react': 'React',
    'next.js': 'Next.js',
    'vue': 'Vue',
    'tailwind': 'Tailwind CSS',
    'express': 'Express.js',
    'node.js': 'Node.js',
    'spring boot': 'Spring Boot',
    'mongodb': 'MongoDB',
    'postgresql': 'PostgreSQL',
    'mysql': 'MySQL',
    'gemini': 'Gemini AI',
    'openai': 'OpenAI',
    'python': 'Python',
    'fastapi': 'FastAPI',
    'flask': 'Flask',
    'scikit-learn': 'Scikit-learn',
    'pandas': 'Pandas',
    'typescript': 'TypeScript',
    'java': 'Java',
    'aws': 'AWS',
    'docker': 'Docker',
    'optaplanner': 'OptaPlanner',
    'graphhopper': 'GraphHopper',
    'd3': 'D3.js',
    'llm': 'LLMs',
    'dbsacn': 'DBSCAN'
  };
  
  for (const [kw, name] of Object.entries(keywords)) {
    if (readme.includes(kw)) {
      tech.add(name);
    }
  }
  
  // also check other files if they exist
  if (files['package.json']) {
      if (files['package.json'].includes('react')) tech.add('React');
      if (files['package.json'].includes('next')) tech.add('Next.js');
      if (files['package.json'].includes('express')) tech.add('Express.js');
      if (files['package.json'].includes('typescript')) tech.add('TypeScript');
  }

  return {
    repo,
    tech: [...tech],
    hasReadme: !!files['README.md']
  };
});

fs.writeFileSync('analysis_readme.json', JSON.stringify(analysis, null, 2));
