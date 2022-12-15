const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');
uuid();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'Comment number: 1, lorem ipsum....'
    },
    {
        id: uuid(),
        username: 'Todasdad',
        comment: 'Comment number: 2, lorem ipsum....'
    },
    {
        id: uuid(),
        username: 'Todasdd',
        comment: 'Comment number: 3, lorem ipsum....'
    },
    {
        id: uuid(),
        username: 'Toddaoksd',
        comment: 'Comment number: 4, lorem ipsum....'
    },
    {
        id: uuid(),
        username: 'Toddasl',
        comment: 'Comment number: 5, lorem ipsum....'
    },
    {
        id: uuid(),
        username: 'aosfj',
        comment: 'Comment number: 6, lorem ipsum....'
    },
    {
        id: uuid(),
        username: 'jioaf',
        comment: 'Comment number: 7, lorem ipsum....'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newCommentText;
    res.redirect("/comments")
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments')
})







// app.get('/tacos', (req, res) => {
//     res.send("GET /tacos response")
// })

// app.post('/tacos', (req, res) => {
//     const { meat, qty } = req.body;
//     res.send(`Ok, here are your ${qty} ${meat} tacos`)
// })

// app.listen(3000, () => {
//     console.log("On port 3000");
// })