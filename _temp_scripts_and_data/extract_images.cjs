const fs = require('fs');
const data = JSON.parse(fs.readFileSync('repo_data.json', 'utf8'));

let projectUpdates = {};

data.forEach(repoObj => {
  const readme = repoObj.files['README.md'] || '';
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  let match;
  let images = [];
  while ((match = imageRegex.exec(readme)) !== null) {
    let url = match[1];
    if (url && !url.startsWith('http')) {
       url = `https://raw.githubusercontent.com/SujalPatil21/${repoObj.repo}/main/${url.replace(/^\.\//, '')}`;
    }
    images.push(url);
  }
  if (images.length > 0) {
    projectUpdates[repoObj.repo] = images;
  }
});
fs.writeFileSync('images.json', JSON.stringify(projectUpdates, null, 2));
