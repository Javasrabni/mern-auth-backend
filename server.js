const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// Middleware
app.use(express.json());
app.use(cors());

// connect mongoDB
mongoose.connect('mongodb://localhost:27017/mern-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log('Connected with MongoDB'))
.catch(err => console.error(err))

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
    } catch (err) {
      alert('Invalid credentials');
    }
  };
  

app.listen(5000, ()=> console.log('Running on Localhost 5000'))