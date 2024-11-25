import express from 'express';
import Appointment from '../models/Appointment';

const router = express.Router();

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('service');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

// Create new appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating appointment' });
  }
});

// Confirm appointment
router.put('/:id/confirm', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'confirmed' },
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error confirming appointment' });
  }
});

// Cancel appointment
router.put('/:id/cancel', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error cancelling appointment' });
  }
});

export default router;