import { validateMessageContent } from '../constants/validation.js';

/**
 * Middleware do walidacji treści wiadomości w body requestu
 */
export const validateMessageBody = (req, res, next) => {
  const { content } = req.body;
  const { isValid, error } = validateMessageContent(content);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: error
    });
  }

  // Zapisz oczyszczoną wartość
  req.body.content = content.trim();
  next();
};

