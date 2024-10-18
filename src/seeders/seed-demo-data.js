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
      console.log('Existing users:', existingUsers[0]);

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
        ]);
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
            is_active: true,
            country: 'CO' // Ajusta según sea necesario
          },
          {
            name: 'Provider 2',
            contact_email: 'provider2@example.com',
            api_key: 'provider2-api-key',
            is_active: true,
            country: 'CO' // Ajusta según sea necesario
          }
        ], { returning: true });
      } else {
        // Si los proveedores ya existen, obtén sus IDs para las transacciones
        console.log('Providers already exist:', existingProviders[0]);
        providers = existingProviders[0];
      }

      // Generar 50 transacciones fake
      const transactions = [];
      for (let i = 0; i < 10; i++) {
        const transaction = {
          transaction_type: faker.helpers.arrayElement(['payin', 'payout']),
          amount: parseFloat(faker.finance.amount(50, 1000, 2)),
          status: faker.helpers.arrayElement(['pending', 'approved', 'rejected']),
          transaction_date: faker.date.recent(),
          reference: faker.string.uuid(),
          currency: faker.finance.currencyCode(),
          numdoc: faker.string.numeric(10),
          username: faker.person.fullName(),
          userphone: faker.phone.number(),
          useremail: faker.internet.email(),
          typetransaction: faker.helpers.arrayElement(['1', '3']), // 1 para pagos en línea, 3 para pagos en efectivo
          method: faker.helpers.arrayElement(['TUP_GEN', 'TUP_PSE', 'TUP_NEQUI', 'TUP_DAVIPLATA', 'TUP_EFECTY', 'TUP_EFECTIVO']),
          accountNumber: faker.string.numeric(10),
          bankAgreementNumber: faker.finance.bic(),
          paymentReceipt: null,
          user_id: existingUsers[0][0].user_id, // Asignar el primer usuario
          provider_id: providers[0].provider_id, // Asignar el primer proveedor
          createdAt: new Date(),
          updatedAt: new Date(),
          userbank: faker.company.name(),
          usertypeaccount: faker.helpers.arrayElement(['checking', 'savings']),
          usernumaccount: faker.string.numeric(20),
          expiration: faker.date.future(),
          issueDate: faker.date.past(), // Asegúrate de proporcionar un valor aquí
          dueDate: faker.date.future(), // Asegúrate de proporcionar un valor aquí
          username: faker.person.fullName().slice(0, 50), // Asegúrate de que el nombre no supere los 50 caracteres
          userphone: faker.phone.number(), // Asegúrate de que esto no exceda los 20 caracteres
        };

        transactions.push(transaction);
      }

      // Insertar las transacciones generadas
      const insertedTransactions = await queryInterface.bulkInsert('transactions', transactions, { returning: true });

      // Generar facturas asociadas a las transacciones
      const invoices = insertedTransactions.map(transaction => ({
        transaction_id: transaction.id, // Asociar cada factura con una transacción
        invoice_number: faker.string.uuid(), // Usar UUID como número de factura para garantizar unicidad
        amount: transaction.amount, // El monto de la factura es el mismo que la transacción
        status: 'pending', // Estado inicial de la factura
        created_at: new Date(), // Asegúrate de que coincide con el nombre del campo en el modelo
      }));


      // Insertar las facturas generadas
      await queryInterface.bulkInsert('invoices', invoices);

    } catch (error) {
      console.error('Error during seeding:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('invoices', null, {});
    await queryInterface.bulkDelete('transactions', null, {});
    await queryInterface.bulkDelete('providers', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
