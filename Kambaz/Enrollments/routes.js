import * as dao from './dao.js';

export default function EnrollmentRoutes(app) {
  app.post('/api/enrollments/:userId/:courseId', async (req, res) => {
    const enrollment = await dao.enrollUserInCourse(req.params.userId, req.params.courseId);
    res.json(enrollment);
  });

  app.delete('/api/enrollments/:userId/:courseId', async (req, res) => {
    await dao.unenrollUserFromCourse(req.params.userId, req.params.courseId);
    res.sendStatus(204);
  });

  app.get('/api/enrollments/user/:userId', async (req, res) => {
    const courses = await dao.findCoursesForUser(req.params.userId);
    res.json(courses);
  });

  app.get('/api/enrollments/course/:courseId', async (req, res) => {
    const users = await dao.findUsersForCourse(req.params.courseId);
    res.json(users);
  });
}