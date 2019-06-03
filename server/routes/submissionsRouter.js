const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET the 10 most recent equations submitted
router.get('/get-results', (req, res) => {
   const queryText = 'SELECT * FROM equations ORDER BY date DESC LIMIT(10) ';
   pool.query(queryText)
     .then((result) => {
         res.send(result.rows);
      })
     .catch((err) => {
         console.log('Error completing GET request', err);
         res.sendStatus(500);
     });
});

// POST a new equation to the db
router.post('/submit', (req, res) => {
   let num1 = req.body.num1
   let num2 = req.body.num2
   let op = req.body.operator
   let insertValue = ''
   switch(op){
      case '+':
         insertValue = `${num1} ${op} ${num2} = ${Math.round((parseInt(num1) + parseInt(num2)) * 100) / 100}`;
         break;
      case '-':
         insertValue = `${num1} ${op} ${num2} = ${Math.round((parseInt(num1) - parseInt(num2)) * 100) / 100}`;
         break;
      case '*':
         insertValue = `${num1} ${op} ${num2} = ${Math.round((parseInt(num1) * parseInt(num2)) * 100) / 100}`;
         break;
      case '/':
         insertValue = `${num1} ${op} ${num2} = ${Math.round((parseInt(num1) / parseInt(num2)) * 100) / 100}`;
         break;
      default:
         break;
   }
   const sql = `INSERT INTO equations (equation) VALUES ($1)`;
   
   console.log(insertValue)
   
   pool.query(sql, [insertValue])
      .then((result) => {
         res.sendStatus(201);
      })
      .catch((err) => {
         console.log('Error with POST request to db: ', err);
         res.sendStatus(500);
      });
});

module.exports = router;