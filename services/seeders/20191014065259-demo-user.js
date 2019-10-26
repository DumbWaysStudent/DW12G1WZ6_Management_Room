'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('users',[
      {
        email : 'rizkyabdulrachman@gmail.com',
        password : 'dedeiki',
        name : 'Dede Iki',
        createdAt : Sequelize.fn('NOW'),
        updatedAt : Sequelize.fn('NOW')
      },
      {
        email : 'babangciko@gmail.com',
        password : 'babangciko',
        name : 'babangciko',
        createdAt : Sequelize.fn('NOW'),
        updatedAt : Sequelize.fn('NOW')
      }

    ],{})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('users', null, {});
  }
};
