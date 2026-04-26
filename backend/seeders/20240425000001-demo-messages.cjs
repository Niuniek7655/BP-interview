'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const seedMessages = [
      {
        content: 'Witaj w aplikacji wiadomości! To jest pierwsza przykładowa wiadomość.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'To jest druga wiadomość testowa. Możesz ją edytować lub usunąć.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'Trzecia wiadomość demonstracyjna. System wiadomości działa poprawnie!',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

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

  async down(queryInterface, Sequelize) {
    // Usuń tylko te wiadomości, które zostały dodane przez seeder
    const seedContents = [
      'Witaj w aplikacji wiadomości! To jest pierwsza przykładowa wiadomość.',
      'To jest druga wiadomość testowa. Możesz ją edytować lub usunąć.',
      'Trzecia wiadomość demonstracyjna. System wiadomości działa poprawnie!'
    ];

    await queryInterface.bulkDelete('Messages', {
      content: seedContents
    }, {});
  }
};

