const posts = require('../data/posts.js');

///INDEX///
function index(req, res){
    res.json(posts);
}

///SHOW///
function show(req, res){
    const id = parseInt(req.params.id);
    const post = posts.find((el) => el.id === id);

    if (post){
        console.log(`Ecco il post con id: ${id}`);
        res.json(post);
    } else {
        res.json({message: `Post con id: ${id} non trovato`});
    }
}

///STORE///
function store(req, res){
    res.send('Creo un nuovo post');
}

///UPDATE///
function update(req, res){
    const id = req.params.id;
    res.send(`Aggiorno il post con id: ${id}`);
}

///MODIFY///
function modify(req, res){
    const id = req.params.id;
    res.send(`Modifico il post con id: ${id}`);
}

///DESTROY///
function destroy(req, res){
    const id = req.params.id;
    res.send(`Elimino il post con id: ${id}`);
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}