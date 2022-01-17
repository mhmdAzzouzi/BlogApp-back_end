'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
      await queryInterface.bulkInsert('user', [{
        id: 1,
        name: 'user1',
        email: 'user1@test.com',
        created_at: new Date(),
        updated_at: new Date(),
      },], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
