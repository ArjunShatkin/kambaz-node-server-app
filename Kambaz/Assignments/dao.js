import Assignment from './model.js';

export const findAssignmentsForCourse = async (courseId) => {
  return await Assignment.find({ course: courseId });
};

export const createAssignment = async (assignment) => {
  return await Assignment.create(assignment);
};

export const deleteAssignment = async (assignmentId) => {
  return await Assignment.findByIdAndDelete(assignmentId);
};

export const updateAssignment = async (assignmentId, assignmentUpdates) => {
  return await Assignment.findByIdAndUpdate(assignmentId, assignmentUpdates, { new: true });
};