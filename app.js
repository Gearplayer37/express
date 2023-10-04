
// const express = require('express');

// const app = express();

// app.get('/', (req,res) =>{
//     res.send('Olá, Mundo!');
// });

// app.listen(3000,() => {
//     console.log('Aplicativo Express rodando na porta 3000');
// });

const express = require('express');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');

//configuração do ejs para carregar as views
app.set('view engine', 'ejs')
app.set('views',__dirname + '/views');

//configurar o body-parser para processar os dados do form
app.use(bodyParser.urlencoded({extended : true}));

//blog
const posts = [
    {
        id: 1,
        title: 'Primeiro Postagem',
        content: 'A hUNter mUSt hUNt'

    },
    {
        id: 2,
        title: 'Primeiro Postagem',
        content: 'You don t build a barn Dumbass! This isn t 1795!'

    }
];

//Rota principal
app.get('/',(req, res) =>{
    res.render('index', {posts});
});

//Rotas para exibir uma postagem individual
app.get('/post/:id', (req, res) => {
    const id = req.params.id;
    const post = posts.find(post => post.id === parseInt(id))
    res.render('post', {post});
});

//rota para exibir o formulário de adição
app.get('/add',(req, res) => {
    res.render('add');
});

//rota para processar a adição  da postagem
app.post('/add', (req, res) => {
    const { title, content } = req.body;
    const id = posts.length + 1;
    posts.push({id, title, content});
    res.redirect('/');
});

app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`)
});

