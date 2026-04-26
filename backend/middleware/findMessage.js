import { Message } from '../models/index.js';
import { MESSAGE_VALIDATION } from '../constants/validation.js';

/**
 * Middleware do wyszukiwania wiadomości po ID
 * Ustawia req.message jeśli znaleziono
 */
export const findMessageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Message.findByPk(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: MESSAGE_VALIDATION.ERRORS.NOT_FOUND
      });
    }

    req.message = message;
    next();
  } catch (error) {
    next(error);
  }
};

