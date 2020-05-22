const express = require('express');
const router = express.Router();

const Message = require('../models/Message');

router.delete('/chat', (res, req) => {
    Message.deleteMany({}).then(occur => console.log('Deleted'));
});

router.get('/chat', async (req, res) => {
    try {
        const data = await Message.find();
        res.json(data);
    } catch (err) {
        console.log('Error: ' + err);
    }
});

router.post('/chat', (req, res) => {
    const newMsg = new Message(req.body);

    newMsg.save(err => {
        if (err) res.sendStatus(500);
        res.sendStatus(200);
    });
});

module.exports = router;