/**
 * Stałe walidacji dla wiadomości
 */
export const MESSAGE_VALIDATION = {
  MIN_LENGTH: 3,
  ERRORS: {
    EMPTY: 'Treść wiadomości jest wymagana',
    TOO_SHORT: 'Wiadomość musi mieć co najmniej 3 znaki',
    NOT_FOUND: 'Wiadomość nie została znaleziona'
  }
};

/**
 * Waliduje treść wiadomości
 * @param {string} content - Treść do walidacji
 * @returns {{ isValid: boolean, error: string | null }}
 */
export const validateMessageContent = (content) => {
  if (!content || !content.trim()) {
    return { isValid: false, error: MESSAGE_VALIDATION.ERRORS.EMPTY };
  }

  if (content.trim().length < MESSAGE_VALIDATION.MIN_LENGTH) {
    return { isValid: false, error: MESSAGE_VALIDATION.ERRORS.TOO_SHORT };
  }

  return { isValid: true, error: null };
};

