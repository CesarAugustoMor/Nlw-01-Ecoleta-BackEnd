import knex from 'knex';
import path from 'path';

const conection = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
});

export default conection;
