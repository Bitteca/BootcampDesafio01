const express = require('express');

const server = express();
server.use(express.json());

const projects = [];

function checkProjectId(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);
  if (!project) {
    return res.status(400).json({ error: 'Project does not exist' });
  }
  return next();
}

function countReqs(req, res, next) {
  console.log('Numero de Requisiçoes');
  next();
}

server.use(countReqs);

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = { id, title, tasks: [] };

  projects.push(project);

  return res.json(projects);
});

server.post('/projects/:id/tasks', checkProjectId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id === id);

  project.tasks.push(title);

  return res.json(projects);
});

server.put('/projects/:id', checkProjectId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(projects);
});

server.delete('/projects/:id', checkProjectId, (req, res) => {
  const { id } = req.params;
  const index = projects.findIndex(p => p.id === id);
  projects.splice(index, 1);

  return res.send();
});

server.listen(3000);
