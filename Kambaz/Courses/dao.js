import Course from './model.js';

export const findAllCourses = async () => {
  return await Course.find();
};

export const findCourseById = async (courseId) => {
  return await Course.findById(courseId);
};

export const createCourse = async (course) => {
  return await Course.create(course);
};

export const updateCourse = async (courseId, courseUpdates) => {
  return await Course.findByIdAndUpdate(courseId, courseUpdates, { new: true });
};

export const deleteCourse = async (courseId) => {
  return await Course.findByIdAndDelete(courseId);
};