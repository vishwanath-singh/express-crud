const express = require('express')
const port = 3001

const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

//const Post = require('./models/posts');

const app = express()

const sequelize = require('./util/database');

app.use(bodyParser.json()); //aplication/json

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/feed', feedRoutes)

sequelize.sync()
.then(result => {})
.catch(err => console.log(err))

app.listen(port, () => console.log('listening on port 3001'))