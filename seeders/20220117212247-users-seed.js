'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
      await queryInterface.bulkInsert('Users', [{
        id: 1,
        firstName: 'user001',
        lastName: 'bloger001',
        email: 'user001@test.com',
        password: '123',
        verified: false,
        profileImage: 'https://live.staticflickr.com/8024/29835288606_c59cf15c2d_n.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
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
