const express = require('express');  // create web serves with express;
const mongoose = require('mongoose');
const app = express();

const Article = require('./models/Article'); // orm or odm 

app.use(express.json()); // use express.json pour le bady parameters imkaniyat lwosol li json;

const dbURI = 'mongodb://localhost:27017/zack';
mongoose.connect(dbURI)
.then( () => {
    console.log("connection successful");
}).catch(err => {
    console.log(err);
})



app.get('/', (req, res) => { // routes  [1]path parameters /:  samting ....  [2] bady parameters {json{}} [3] query parameters ?key=value
    res.send('wch a sat');
})

app.get('/sum/:num1/:num2', (req, res) => {
    const num1 = +req.params.num1;
    const num2 = +req.params.num2;
    res.send(`find sum ${num1} + ${num2} = ${num1 + num2}`);
})
app.get('/sayHi', (req, res) => {
    const name = req.body.name;
    const age = req.query.age
    res.send(`Hi, ${name} and your age is ${age}`);
})
app.get('/sendFile', (req, res) => {
    // template injented; EJS
    // res.sendFile(__dirname + '/views/main.html');
    res.render("main.ejs", {
        name: 'zakaria jouk',
    })
})

// Articles Endpoint
app.post('/article', async (req, res) => {
    const titel = req.body.articleTitel;
    const bady = req.body.acticleBody;

    const newActicle = new Article();

    newActicle.titel = `${titel}`;
    newActicle.body = `${bady}`;
    newActicle.numberOfLikes = 10;

    await newActicle.save();

    res.send('the article has been saved successfully');
})
app.get('/articles', async (req, res) => {

    const allArticales = await Article.find(); 
    res.json(allArticales);

})
app.get('/article/:articaleId', async (req, res) => {

    const id = req.params.articaleId;
    const articale = await Article.findById(id); 
    res.json(articale);
})

app.listen(5000, () => {
    console.log("i am listening in port 5000");
});