const Payment = require('../models/Payment');

exports.simulatePayment = async (req, res) => {
    const payment = await Payment.find();
    res.json({ message: 'Payment status updated to paid', payment });
};

exports.addPayment = async (req, res) => {
    const { projectId, amount, status } = req.body;
    try {
        const newPayment = new Payment({ projectId, amount, status });
        await newPayment.save();
        res.status(201).json({ message: 'Payment added successfully', payment: newPayment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add payment' });
    }
};