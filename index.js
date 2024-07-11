// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const tenantRoutes = require('./routes/tenantRoutes');

const listingRoutes = require('./routes/ListingRoute');
const leaseRoutes = require('./routes/leaseRoutes'); // 
const reviewRoutes = require('./routes/reviewRoutes'); // Add review routes
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const contactRoutes=require('./routes/contactRoute')
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables
dotenv.config();
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads folder

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

// Use the tenant routes
app.use('/api', tenantRoutes);
app.use('/api', listingRoutes);
app.use('/api/leases', leaseRoutes);
app.use('/api', reviewRoutes); // Add review routes
app.use('/api', blogRoutes);
app.use('/api/contact',contactRoutes)
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
