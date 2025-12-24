require('dotenv').config();
const express = require("express");
const path = require('path');
const cors = require('cors');

const app = express();


require('dotenv').config();


// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
