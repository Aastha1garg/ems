import express from 'express';
import Leave from '../models/Leave.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const leaves = await Leave.find({ empId: req.params.id });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leave data' });
  }
});

export default router;
