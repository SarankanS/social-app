require('dotenv').config();
const express = require("express");
const path = require('path');
const cors = require('cors');



// const authRoutes = require('./routes/auth'); 
// const userRoutes = require('./routes/users');
const postRoutes = require('./routes/postRoutes');

const app = express();  


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
