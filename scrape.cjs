const https = require('https');
const fs = require('fs');

const repos = ['Geo-Watch', 'AASHA', 'WardWatch', 'Globe-Trotter', 'Mind-Meal', 'StaySplit', 'DISPATCHOPS', 'Drill-Insight', 'Mob-Alert', 'GitGo', 'Arch-Flow'];
const user = 'SujalPatil21';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
      let data = '';
      if (res.statusCode === 301 || res.statusCode === 302) {
        return resolve(fetchUrl(res.headers.location));
      }
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function scrapeRepo(repo) {
  const filesToTry = ['README.md', 'package.json', 'pom.xml', 'requirements.txt', 'pyproject.toml', 'docker-compose.yml', 'go.mod'];
  let result = { repo, files: {} };
  
  for (const file of filesToTry) {
    const url = `https://raw.githubusercontent.com/${user}/${repo}/main/${file}`;
    const res = await fetchUrl(url);
    if (res.status === 200) {
      result.files[file] = res.data.substring(0, 5000);
    } else {
      const urlMaster = `https://raw.githubusercontent.com/${user}/${repo}/master/${file}`;
      const resMaster = await fetchUrl(urlMaster);
      if (resMaster.status === 200) {
        result.files[file] = resMaster.data.substring(0, 5000);
      }
    }
  }
  return result;
}

async function run() {
  const allData = [];
  for (const repo of repos) {
    console.log('Fetching', repo);
    allData.push(await scrapeRepo(repo));
  }
  fs.writeFileSync('repo_data.json', JSON.stringify(allData, null, 2));
  console.log('Done');
}

run();
