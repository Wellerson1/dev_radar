const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors')


mongoose.connect('mongodb+srv://WELLERSON96:WELL261996@cluster0-ig5l5.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

//cors libera o acesso externo para toda app
app.use(cors({}));
app.use(express.json());
app.use(routes);


app.listen(3333);