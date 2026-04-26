import express from 'express';
import { Message } from '../models/index.js';

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
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Message.findByPk(id);
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Wiadomość nie została znaleziona' 
      });
    }
    
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
});

// POST /messages - dodaj nową wiadomość
router.post('/', async (req, res, next) => {
  try {
    const { content } = req.body;
    
    if (!content || !content.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Treść wiadomości jest wymagana' 
      });
    }

    if (content.trim().length < 3) {
      return res.status(400).json({ 
        success: false, 
        message: 'Wiadomość musi mieć co najmniej 3 znaki' 
      });
    }
    
    const message = await Message.create({ content: content.trim() });
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
});

// PUT /messages/:id - zaktualizuj wiadomość
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    if (!content || !content.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Treść wiadomości jest wymagana' 
      });
    }

    if (content.trim().length < 3) {
      return res.status(400).json({ 
        success: false, 
        message: 'Wiadomość musi mieć co najmniej 3 znaki' 
      });
    }
    
    const message = await Message.findByPk(id);
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Wiadomość nie została znaleziona' 
      });
    }
    
    await message.update({ content: content.trim() });
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
});

// DELETE /messages/:id - usuń wiadomość
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Message.findByPk(id);
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Wiadomość nie została znaleziona' 
      });
    }
    
    await message.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
