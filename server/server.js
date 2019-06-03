
const express = require('express');
require('dotenv').config();
const app = express();

// Route include
const submissionsRouter = require('./routes/submissionsRouter.js');

// Body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route usage
app.use('/api/submissions', submissionsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
