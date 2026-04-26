/**
 * Stałe walidacji dla wiadomości
 */
export const MESSAGE_VALIDATION = {
  MIN_LENGTH: 3,
  ERRORS: {
    EMPTY: "Wiadomość nie może być pusta",
    TOO_SHORT: "Wiadomość musi mieć co najmniej 3 znaki"
  }
} as const;

/**
 * Waliduje treść wiadomości
 * @param message - Treść do walidacji
 * @returns Komunikat błędu lub null jeśli walidacja przeszła
 */
export const validateMessage = (message: string): string | null => {
  if (!message.trim()) {
    return MESSAGE_VALIDATION.ERRORS.EMPTY;
  }

  if (message.trim().length < MESSAGE_VALIDATION.MIN_LENGTH) {
    return MESSAGE_VALIDATION.ERRORS.TOO_SHORT;
  }

  return null;
};

