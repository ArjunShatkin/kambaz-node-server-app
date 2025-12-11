import * as dao from './dao.js';

export default function ModuleRoutes(app) {
  app.get('/api/courses/:courseId/modules', async (req, res) => {
    const modules = await dao.findModulesForCourse(req.params.courseId);
    res.json(modules);
  });

  app.post('/api/courses/:courseId/modules', async (req, res) => {
    const module = await dao.createModule({
      ...req.body,
      course: req.params.courseId
    });
    res.json(module);
  });

  app.delete('/api/modules/:moduleId', async (req, res) => {
    await dao.deleteModule(req.params.moduleId);
    res.sendStatus(204);
  });

  app.put('/api/modules/:moduleId', async (req, res) => {
    const module = await dao.updateModule(req.params.moduleId, req.body);
    res.json(module);
  });
}