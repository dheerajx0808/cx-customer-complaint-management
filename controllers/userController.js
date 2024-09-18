const { Pool } = require('pg');
const pool = new Pool({
  user: 'app_user',
  host: 'localhost',
  database: 'customer_complaint_management_db',
  password: 'app_user_pwd',
  port: 5432,
  schema: 'complaint_management'
});


exports.getUser = (req, res) => {
  const userId = req.params.userId;
  pool.query('SELECT * FROM complaint_management.customer_account WHERE username = $1', [userId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

exports.postUser = (req, res) => {
  const userId = req.params.userId;
  const { firstname, lastname, username, email, country, locale, address } = req.body;

  pool.query(
    'INSERT INTO complaint_management.customer_account (firstname, lastname, username, email, country, locale, address) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [firstname, lastname, username, email, country, locale, address],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User added with ID: ${userId}`);
    }
  );
};
