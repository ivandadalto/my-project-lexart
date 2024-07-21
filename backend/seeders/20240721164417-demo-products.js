'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Xiaomi Redmi 9',
        brand: 'Xiaomi',
        model: 'Redmi 9',
        price: 10000,
        color: 'red',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Iphone 14 Pro',
        brand: 'Iphone',
        model: '14 Pro',
        price: 30000,
        color: 'silver',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
