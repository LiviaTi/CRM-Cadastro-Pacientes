// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: 'postgres://urofn7e7juhjd:p2d638776e4f8bb04831a4ca7ae27b563737cdfbb1122306002940ee2bdc06445@casrkuuedp6an1.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d82kiihhq01ve1',
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './src/database/migrations'
    }
  }
};
