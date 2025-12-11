import Enrollment from './model.js';

export const enrollUserInCourse = async (userId, courseId) => {
  return await Enrollment.create({ user: userId, course: courseId });
};

export const unenrollUserFromCourse = async (userId, courseId) => {
  return await Enrollment.findOneAndDelete({ user: userId, course: courseId });
};

export const findCoursesForUser = async (userId) => {
  const enrollments = await Enrollment.find({ user: userId }).populate('course');
  return enrollments.map(e => e.course);
};

export const findUsersForCourse = async (courseId) => {
  const enrollments = await Enrollment.find({ course: courseId }).populate('user');
  return enrollments.map(e => e.user);
};