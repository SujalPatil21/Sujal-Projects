const fs = require('fs');
const data = JSON.parse(fs.readFileSync('repo_data.json', 'utf8'));

const analysis = data.map(repoObj => {
  const repo = repoObj.repo;
  const files = repoObj.files;
  
  let frontend = [];
  let backend = [];
  let db = [];
  let ai = [];
  let tools = [];
  
  const hasFile = (name) => files[name] && files[name].length > 0;
  
  // Package.json
  if (hasFile('package.json')) {
    const pkgStr = files['package.json'];
    try {
      const pkg = JSON.parse(pkgStr);
      const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
      
      if (deps['react']) frontend.push('React');
      if (deps['next']) frontend.push('Next.js');
      if (deps['vue']) frontend.push('Vue');
      if (deps['tailwindcss']) frontend.push('Tailwind CSS');
      
      if (deps['express']) backend.push('Express.js');
      if (deps['mongoose'] || deps['mongodb']) db.push('MongoDB');
      if (deps['pg']) db.push('PostgreSQL');
      
      if (deps['@google/generative-ai']) ai.push('Gemini AI');
      
      if (deps['d3']) frontend.push('D3.js');
      
      if (deps['typescript']) tools.push('TypeScript');
    } catch(e) {}
  }
  
  // pom.xml
  if (hasFile('pom.xml')) {
    const pom = files['pom.xml'];
    if (pom.includes('spring-boot')) backend.push('Spring Boot');
    if (pom.includes('postgresql')) db.push('PostgreSQL');
    if (pom.includes('mysql')) db.push('MySQL');
    backend.push('Java');
  }
  
  // pyproject.toml / requirements.txt
  if (hasFile('requirements.txt') || hasFile('pyproject.toml')) {
    const py = (files['requirements.txt'] || '') + (files['pyproject.toml'] || '');
    if (py.includes('scikit-learn')) ai.push('Scikit-learn');
    if (py.includes('pandas')) tools.push('Pandas');
    if (py.includes('fastapi')) backend.push('FastAPI');
    if (py.includes('flask')) backend.push('Flask');
    backend.push('Python');
  }

  return {
    repo,
    frontend: [...new Set(frontend)],
    backend: [...new Set(backend)],
    db: [...new Set(db)],
    ai: [...new Set(ai)],
    tools: [...new Set(tools)]
  };
});

fs.writeFileSync('analysis.json', JSON.stringify(analysis, null, 2));
console.log('Analysis written to analysis.json');
