'use strict';

/**
 * Przykładowe wiadomości do seedowania
 */
const SEED_CONTENTS = [
  'Witaj w aplikacji wiadomości! To jest pierwsza przykładowa wiadomość.',
  'To jest druga wiadomość testowa. Możesz ją edytować lub usunąć.',
  'Trzecia wiadomość demonstracyjna. System wiadomości działa poprawnie!'
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const seedMessages = SEED_CONTENTS.map(content => ({
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Sprawdź które wiadomości już istnieją w bazie danych
    const existingMessages = await queryInterface.sequelize.query(
      `SELECT content FROM Messages WHERE content IN (${seedMessages.map(m => queryInterface.sequelize.escape(m.content)).join(', ')})`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const existingContents = existingMessages.map(m => m.content);

    // Filtruj tylko te wiadomości, które jeszcze nie istnieją
    const messagesToInsert = seedMessages.filter(
      m => !existingContents.includes(m.content)
    );

    if (messagesToInsert.length > 0) {
      await queryInterface.bulkInsert('Messages', messagesToInsert, {});
      console.log(`Dodano ${messagesToInsert.length} nowych wiadomości.`);
    } else {
      console.log('Wszystkie wiadomości seed już istnieją w bazie danych.');
    }
  },

  async down(queryInterface) {
    // Usuń tylko te wiadomości, które zostały dodane przez seeder
    await queryInterface.bulkDelete('Messages', {
      content: SEED_CONTENTS
    }, {});
  }
};
