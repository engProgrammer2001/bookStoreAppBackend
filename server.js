const express = require('express')
const app = express()
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.get('/',  (req, res) =>{
  res.send('Congrats! Your server is up and running!')
})

const userRouter = require('./routes/user.route.js');
app.use('/user', userRouter);

const adminRouter = require('./routes/admin.route.js');
app.use('/admin', adminRouter);

const favouriteRouter = require('./routes/favourite.route.js');
app.use('/favourite', favouriteRouter);

const cartRouter = require('./routes/cart.route.js');
app.use('/cart', cartRouter);

const orderRouter = require('./routes/order.route.js');
app.use('/order', orderRouter);


const  PORT =  process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})


