const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres://root:root@localhost:5432/test_db");

async function  con() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

con()


'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          id: 1,
          name: 'user1',
          email: 'user1@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'user2',
          email: 'user2@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'user3',
          email: 'user3@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'channel',
      [
        {
          id: 1,
          name: 'channel1',
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'channel2',
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'channel3',
          user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'video',
      [
        {
          id: 1,
          title: 'video1ByUser1',
          channel_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          title: 'video2ByUser1',
          channel_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          title: 'video3ByUser2',
          channel_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          title: 'video4ByUser3',
          channel_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          title: 'video5ByUser3',
          channel_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('channel', null, bulkDeleteOptions);
    await queryInterface.bulkDelete('video', null, bulkDeleteOptions);
    await queryInterface.bulkDelete('user', null, bulkDeleteOptions);
  },
};