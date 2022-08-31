'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
      await queryInterface.bulkInsert('Users', [{
        uuid: uuidv4(),
        firstName: 'user002',
        lastName: 'bloger002',
        email: 'user002@test.com',
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
