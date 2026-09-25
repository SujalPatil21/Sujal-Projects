import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { projects } from './data/projects';
import './index.css';

const Home = () => {
  const webApps = projects.filter(p => p.category === 'Web Apps');
  const aiProjects = projects.filter(p => p.category === 'Data Science & AI');
  const devTools = projects.filter(p => p.category === 'Developer Tools');

  return (
    <div className="max-w-[1100px] mx-auto py-12 px-6 bg-white min-h-screen text-gray-900 font-sans">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold mb-2">Projects</h1>
        <p className="text-gray-600 text-sm">A collection of software engineering projects, systems, developer tools, and technical experiments.</p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Web Apps</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-600">
                <th className="py-3 px-4 font-medium w-48">Project</th>
                <th className="py-3 px-4 font-medium w-48">Frontend</th>
                <th className="py-3 px-4 font-medium w-48">Backend</th>
                <th className="py-3 px-4 font-medium w-24">Live</th>
                <th className="py-3 px-4 font-medium min-w-[300px] whitespace-normal">Description</th>
              </tr>
            </thead>
            <tbody>
              {webApps.map(p => (
                <tr key={p.slug} className="border-b border-gray-100 hover:bg-gray-50/50 align-top">
                  <td className="py-3 px-4">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{p.name}</a>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{p.stack.frontend.join(', ') || '-'}</td>
                  <td className="py-3 px-4 text-gray-600">{p.stack.backend.join(', ') || '-'}</td>
                  <td className="py-3 px-4">
                    {p.live ? (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">live</a>
                    ) : p.docs ? (
                      <Link to={p.docs} className="text-blue-600 hover:underline">docs</Link>
                    ) : '-'}
                  </td>
                  <td className="py-3 px-4 text-gray-600 whitespace-normal">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">AI / Intelligent Projects</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-600">
                <th className="py-3 px-4 font-medium w-48">Project</th>
                <th className="py-3 px-4 font-medium w-64">Stack</th>
                <th className="py-3 px-4 font-medium w-24">Live</th>
                <th className="py-3 px-4 font-medium min-w-[300px] whitespace-normal">Description</th>
              </tr>
            </thead>
            <tbody>
              {aiProjects.map(p => (
                <tr key={p.slug} className="border-b border-gray-100 hover:bg-gray-50/50 align-top">
                  <td className="py-3 px-4">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{p.name}</a>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{[...p.stack.frontend, ...p.stack.backend, ...p.stack.database, ...p.stack.infrastructure].join(', ') || '-'}</td>
                  <td className="py-3 px-4">
                    {p.live ? (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">live</a>
                    ) : p.docs ? (
                      <Link to={p.docs} className="text-blue-600 hover:underline">docs</Link>
                    ) : '-'}
                  </td>
                  <td className="py-3 px-4 text-gray-600 whitespace-normal">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Developer Tools</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-600">
                <th className="py-3 px-4 font-medium w-48">Project</th>
                <th className="py-3 px-4 font-medium w-64">Stack</th>
                <th className="py-3 px-4 font-medium w-24">Live</th>
                <th className="py-3 px-4 font-medium min-w-[300px] whitespace-normal">Description</th>
              </tr>
            </thead>
            <tbody>
              {devTools.map(p => (
                <tr key={p.slug} className="border-b border-gray-100 hover:bg-gray-50/50 align-top">
                  <td className="py-3 px-4">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{p.name}</a>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{[...p.stack.frontend, ...p.stack.backend, ...p.stack.database, ...p.stack.infrastructure].join(', ') || '-'}</td>
                  <td className="py-3 px-4">
                    {p.live ? (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">live</a>
                    ) : p.docs ? (
                      <Link to={p.docs} className="text-blue-600 hover:underline">docs</Link>
                    ) : '-'}
                  </td>
                  <td className="py-3 px-4 text-gray-600 whitespace-normal">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const ProjectPage = () => {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return <div className="max-w-[1100px] mx-auto py-12 px-6 bg-white min-h-screen font-sans">Project not found</div>;
  }

  return (
    <div className="max-w-[1100px] mx-auto py-12 px-6 bg-white min-h-screen font-sans text-gray-900">
      <Link to="/" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        &larr; Back to Projects
      </Link>
      
      <header className="mb-10">
        <h1 className="text-3xl font-semibold mb-3">{project.name}</h1>
        <p className="text-gray-700 mb-4">{project.description}</p>
        <div className="flex gap-4 text-sm mb-6">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Live</a>
          )}
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          {project.stack.frontend.length > 0 && <div><strong>Frontend:</strong> {project.stack.frontend.join(', ')}</div>}
          {project.stack.backend.length > 0 && <div><strong>Backend:</strong> {project.stack.backend.join(', ')}</div>}
          {project.stack.database.length > 0 && <div><strong>Database:</strong> {project.stack.database.join(', ')}</div>}
          {project.stack.infrastructure.length > 0 && <div><strong>Infrastructure:</strong> {project.stack.infrastructure.join(', ')}</div>}
        </div>
      </header>

      {project.overview && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.overview}</p>
        </section>
      )}

      {project.problem && project.problem.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Problem</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {project.problem.map((prob, i) => (
              <li key={i}>{prob}</li>
            ))}
          </ul>
        </section>
      )}

      {project.solution && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Solution</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.solution}</p>
        </section>
      )}

      {project.features && project.features.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {project.features.map((feature, i) => (
              <li key={i}>
                <strong>{feature.title}:</strong> {feature.description}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.architecture && (project.architecture.image || project.architecture.description.length > 30) && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Architecture</h2>
          {project.architecture.image && (
            <div className="mb-4 border border-gray-200">
              <img src={project.architecture.image} alt={`${project.name} Architecture Diagram`} className="max-w-full h-auto block" />
            </div>
          )}
          {project.architecture.description.length > 30 && (
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.architecture.description}</p>
          )}
        </section>
      )}

      {(project.apis.length > 0 || project.database.length > 0) && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Engineering Details</h2>
          
          {project.apis.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">API Architecture</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-2 font-medium">Method</th>
                      <th className="px-4 py-2 font-medium">Endpoint</th>
                      <th className="px-4 py-2 font-medium min-w-[300px]">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.apis.map((api, i) => (
                      <tr key={i} className="border-b border-gray-100 last:border-0 align-top">
                        <td className="px-4 py-2 text-gray-700">{api.method}</td>
                        <td className="px-4 py-2 text-gray-700 font-mono">{api.endpoint}</td>
                        <td className="px-4 py-2 text-gray-700 whitespace-normal">{api.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {project.database.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Data Model</h3>
              <div className="space-y-4">
                {project.database.map((db, i) => (
                  <div key={i}>
                    <div className="font-semibold text-gray-800">{db.entity}</div>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                      {db.fields.map((field, j) => (
                        <li key={j} className="font-mono">{field}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {project.screenshots && project.screenshots.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Screenshots</h2>
          <div className="border border-gray-200">
            <img src={project.screenshots[0]} alt={`${project.name} Screenshot`} className="max-w-full h-auto block" loading="lazy" />
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Links</h2>
        <ul className="list-disc list-inside text-gray-700">
          {project.github && <li><a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a></li>}
          {project.live && <li><a href={project.live} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Live</a></li>}
        </ul>
      </section>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900">

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-slate-200 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 text-sm font-medium">© 2026 Sujal Patil. Built with React & Tailwind CSS.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
