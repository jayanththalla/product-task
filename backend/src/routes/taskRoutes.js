const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Task creation validation
const taskValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 255 }).withMessage('Title must be less than 255 characters'),
  body('description')
    .optional()
    .trim(),
];

// Task update validation
const taskUpdateValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty')
    .isLength({ max: 255 }).withMessage('Title must be less than 255 characters'),
  body('status')
    .optional()
    .isIn(['Pending', 'Completed']).withMessage('Status must be Pending or Completed'),
  body('description')
    .optional()
    .trim(),
];

router.route('/')
  .get(protect, getTasks)
  .post(protect, taskValidation, validate, createTask);

router.route('/:id')
  .put(protect, taskUpdateValidation, validate, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
