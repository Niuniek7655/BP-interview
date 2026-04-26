import express from 'express';
import { Message } from '../models/index.js';
import { validateMessageBody } from '../middleware/validateMessage.js';
import { findMessageById } from '../middleware/findMessage.js';

const router = express.Router();

// GET /messages - pobierz wszystkie wiadomości
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      order: [['id', 'ASC']]
    });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
});

// GET /messages/:id - pobierz pojedynczą wiadomość
router.get('/:id', findMessageById, (req, res) => {
  res.status(200).json(req.message);
});

// POST /messages - dodaj nową wiadomość
router.post('/', validateMessageBody, async (req, res, next) => {
  try {
    const { content } = req.body;
    const message = await Message.create({ content });
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
});

// PUT /messages/:id - zaktualizuj wiadomość
router.put('/:id', findMessageById, validateMessageBody, async (req, res, next) => {
  try {
    const { content } = req.body;
    await req.message.update({ content });
    res.status(200).json(req.message);
  } catch (error) {
    next(error);
  }
});

// DELETE /messages/:id - usuń wiadomość
router.delete('/:id', findMessageById, async (req, res, next) => {
  try {
    await req.message.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
