const posts = require('../data/posts.js');

///INDEX///
function index(req, res){
    let FilteredPosts = posts;


    if (req.query.tag) {
        const tagQuery = req.query.tag.toLowerCase()
        FilteredPosts = posts.filter((post) => {
    
            for (let i = 0; i < post.tags.length; i++) {
                if (post.tags[i].toLowerCase() === tagQuery) {
                    return true
                }
            }
            return false
        })
    }

    const limit = parseInt(req.query.limit)
	if (limit && !isNaN(limit) && limit >= 0) {
        FilteredPosts = FilteredPosts.slice(0, limit)
    }

    res.json(FilteredPosts)
}

///SHOW///
function show(req, res){
    const id = parseInt(req.params.id);
    const post = posts.find((el) => el.id === id);

    if (post){
        console.log(`Ecco il post con id: ${id}`);
        res.status(200).json(post)
    } else {
        res.status(404).json({
            error: 'Post not found',
            message: `Post con id: ${id} non trovato`
        })
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
    const id = parseInt(req.params.id)
    console.log(`Elimino il post con id: ${id}`);
    
    const postIndex = posts.findIndex((el) => el.id === id)

    if(postIndex === -1) {
        res.status(404)

        return res.json({
            error: 'Post not found',
            message: `Post con id: ${id} non trovato`
        })
    }

    posts.splice(postIndex, 1)

    res.sendStatus(204)
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}