import express from 'express';
import Salary from '../models/Salary.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const salaryHistory = await Salary.find({ empId: req.params.id });
    res.json(salaryHistory);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching salary data' });
  }
});

export default router;
