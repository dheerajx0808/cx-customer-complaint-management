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


exports.putUser =  (req, res) => {
  const { firstname, lastname, username, email, country, locale, address } = req.body;
  const { userId } = req.params;
  try {
    const result =  pool.query(
      'UPDATE complaint_management.customer_account SET firstname = $1, lastname = $2, username = $3, email = $4, country = $5, locale = $6, address = $7 WHERE username = $8 RETURNING *',
      [firstname, lastname, username, email, country, locale, address, userId]
    );

    console.log("result", result);
   //res.status(200).json("Updated the record");

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Update specific user fields
exports.patchUser = (req, res) => {
  const { userId } = req.params;
  const fields = Object.keys(req.body);
  const values = Object.values(req.body);


  //pool.query('UPDATE customer_account SET firstname = $1, email = $2 WHERE id = $3', 
          // ['kx', 'dkx@gmail.com', userId]);
  
  let query = 'UPDATE customer_account SET ';
  query += fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
  query += ' WHERE id = $' + (fields.length + 1) + ' RETURNING *';
  
  try {
    const result = pool.query(query, [...values, userId]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

