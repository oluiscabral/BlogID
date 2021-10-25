import express from 'express';
import mysql from 'mysql';

import Post from './post.js';

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());

var dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abacate",
    database: "blogid"
});

const posts = [new Post('Algum título', 'Alguma descrição', 'oluiscabral', ['Alguma categoria'])];

// dbConnection.connect((err) => {
//     if (err) throw err;
//     dbConnection.query("SELECT post.id, post.titulo, post.descricao, post.autor, categoria.nome as categoria from categoria_post, categoria, post where categoria_post.categoria_id = categoria.id AND categoria_post.post_id = post.id;", (err, resultado) => {
//         if (err) throw err;
//         const post_map = new Object();
//         for (let obj of resultado) {
//             const { id, titulo, descricao, autor, categoria } = obj;
//             if (post_map[id] == undefined) {
//                 post_map[id] = new Post(titulo, descricao, autor, [categoria]);
//             } else {
//                 const post = post_map[id];
//                 post.categorias.push(categoria);
//             }
//         }
//         for (let key in post_map) {
//             const post = post_map[key];
//             posts.push(post);
//         }
//         console.log(posts);
//     });
// });

app.get('/post', (req, res) => {
    return res.json(posts);
});

app.post('/post', (req, res) => {
    const { titulo, descricao, autor, categorias } = req.body;
    posts.push(new Post(titulo, descricao, autor, categorias));
    return res.json(posts);
});

app.get('/post/:index', (req, res) => {
    const { index } = req.params;
    const post = posts[index];
    return res.json(post);
});

app.put('/post/:index', (req, res) => {
    const { index } = req.params;
    const { titulo, descricao, autor, categorias } = req.body;
    const post = posts[index];

    post.titulo = titulo;
    post.descricao = descricao;
    post.autor = autor;
    post.categorias = categorias;
    post.data_criacao = new Date();

    return res.json(posts)
});

app.delete('/post/:index', (req, res) => {
    const { index } = req.params;
    posts.splice(index, 1);
    return res.json({ message: "O post foi deletado." });
});

app.listen(PORT, HOST);
