'use strict';

const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log('Checking if users already exist...');
      
      // Verificar si los usuarios ya existen
      const existingUsers = await queryInterface.sequelize.query(
        `SELECT user_id FROM users WHERE email IN ('john.doe@example.com', 'admin@example.com')`
      );

      // Solo insertar si no existen los usuarios
      if (existingUsers[0].length === 0) {
        await queryInterface.bulkInsert('users', [
          {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: await bcrypt.hash('password123', 10),
            onboarding_date: new Date(),
            role: 'user',
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Admin User',
            email: 'admin@example.com',
            password: await bcrypt.hash('adminpassword', 10),
            onboarding_date: new Date(),
            role: 'admin',
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], { returning: true });
      }

      // Verificar si los proveedores ya existen
      const existingProviders = await queryInterface.sequelize.query(
        `SELECT provider_id FROM providers WHERE api_key IN ('provider1-api-key', 'provider2-api-key')`
      );

      let providers;
      if (existingProviders[0].length === 0) {
        // Solo insertar proveedores si no existen
        providers = await queryInterface.bulkInsert('providers', [
          {
            name: 'Provider 1',
            contact_email: 'provider1@example.com',
            api_key: 'provider1-api-key',
            is_active: true
          },
          {
            name: 'Provider 2',
            contact_email: 'provider2@example.com',
            api_key: 'provider2-api-key',
            is_active: true
          }
        ], { returning: true });
      } else {
        // Si los proveedores ya existen, obtén sus IDs para las transacciones
        providers = existingProviders[0];
      }

      // Generar 50 transacciones fake
      const transactions = [];
      for (let i = 0; i < 50; i++) {
        transactions.push({
          transaction_type: faker.helpers.arrayElement(['payin', 'payout']),
          amount: faker.finance.amount(50, 1000, 2),
          status: faker.helpers.arrayElement(['pending', 'approved', 'rejected']),
          transaction_date: faker.date.between({ from: '2023-01-01', to: '2023-12-31' }),
          description: faker.lorem.sentence(),
          issueDate: faker.date.between({ from: '2022-01-01', to: '2023-01-01' }),
          dueDate: faker.date.between({ from: '2024-01-01', to: '2024-12-31' }),
          reference: faker.string.uuid(),
          currency: faker.finance.currencyCode(),
          numdoc: faker.string.alphanumeric(10),
          username: faker.person.fullName(), // Cambiado a faker.person.fullName()
          userphone: faker.phone.number(),
          email: faker.internet.email(),
          typetransaction: faker.finance.transactionType(),
          method: faker.helpers.arrayElement(['credit_card', 'bank_transfer', 'paypal', 'crypto']),
          accountNumber: faker.string.numeric(10), // Genera un número de cuenta de 10 dígitos
          bankAgreementNumber: faker.finance.bic(),
          paymentReceipt: null,
          user_id: faker.helpers.arrayElement([1, 2]), // Asignar a un usuario existente (1 o 2)
          provider_id: faker.helpers.arrayElement([providers[0].provider_id, providers[1].provider_id]) // Asignar a un proveedor
        });
      }

      // Insertar las transacciones generadas
      await queryInterface.bulkInsert('transactions', transactions);
    } catch (error) {
      console.error('Error during seeding:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transactions', null, {});
    await queryInterface.bulkDelete('providers', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
