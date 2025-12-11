import Module from './model.js';

export const findModulesForCourse = async (courseId) => {
  return await Module.find({ course: courseId });
};

export const createModule = async (module) => {
  return await Module.create(module);
};

export const deleteModule = async (moduleId) => {
  return await Module.findByIdAndDelete(moduleId);
};

export const updateModule = async (moduleId, moduleUpdates) => {
  return await Module.findByIdAndUpdate(moduleId, moduleUpdates, { new: true });
};