import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../Users/model.js';
import Course from '../Courses/model.js';
import Assignment from '../Assignments/model.js';
import Enrollment from '../Enrollments/model.js';
import usersData from './users.js';
import coursesData from './courses.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Assignment.deleteMany({});
    await Enrollment.deleteMany({});
    console.log('Cleared existing data');

    // Remove _id from seed data
    const usersWithoutId = usersData.map(user => {
      const { _id, ...userWithoutId } = user;
      return userWithoutId;
    });

    const coursesWithoutId = coursesData.map(course => {
      const { _id, ...courseWithoutId } = course;
      return courseWithoutId;
    });

    // Insert users and courses
    const insertedUsers = await User.insertMany(usersWithoutId);
    console.log('✅ Users seeded');
    
    const insertedCourses = await Course.insertMany(coursesWithoutId);
    console.log('✅ Courses seeded');

    // Create sample assignments for each course
    const assignmentPromises = insertedCourses.map(async (course) => {
      const assignments = [
        {
          title: `${course.name} Assignment 1`,
          course: course._id,
          description: 'First assignment',
          points: 100,
          dueDate: '2023-05-15'
        },
        {
          title: `${course.name} Assignment 2`,
          course: course._id,
          description: 'Second assignment',
          points: 100,
          dueDate: '2023-05-22'
        },
        {
          title: `${course.name} Assignment 3`,
          course: course._id,
          description: 'Third assignment',
          points: 100,
          dueDate: '2023-05-29'
        }
      ];
      return Assignment.insertMany(assignments);
    });

    await Promise.all(assignmentPromises);
    console.log('✅ Assignments seeded');

    // Enroll all users in all courses (for testing)
    const enrollmentPromises = [];
    for (const user of insertedUsers) {
      for (const course of insertedCourses) {
        enrollmentPromises.push(
          Enrollment.create({
            user: user._id,
            course: course._id
          })
        );
      }
    }

    await Promise.all(enrollmentPromises);
    console.log('✅ Enrollments seeded');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();