const posts = require('../data/posts.js');

///INDEX///
function index(req, res){

    ///TAG
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


    ///LIMIT
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
    
    const { title, content, tags } = req.body;

    if (!title || !content || !tags || !Array.isArray(tags)) {
        return res.status(400).json({
            error: 'Missing data',
        });
    }

    
    const newPost = {
        id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1, 
        title: title,
        content: content,
        tags: tags.map(tag => tag.toLowerCase()) 
    };

    posts.push(newPost);

    
    res.status(201).json(newPost);
}

///UPDATE///
function update(req, res) {
    const id = parseInt(req.params.id);
    const { title, content, tags } = req.body

    
    if (!title || !content || !tags || !Array.isArray(tags)) {
        return res.status(400).json({
            error: 'Missing Data',
        })
    }

    
    const postIndex = posts.findIndex(post => post.id === id);

    if (postIndex === -1) {
        return res.status(404).json({
            error: 'Post not found',
            message: `Post con id: ${id} non trovato.`
        })
    }

    
    posts[postIndex] = {
        id: posts[postIndex].id, 
        title: title,
        content: content,
        tags: tags.map(tag => tag.toLowerCase()) 
    }

    res.status(200).json(posts[postIndex])
}


///MODIFY///
function modify(req, res) {
    const id = parseInt(req.params.id)
    const { title, content, tags } = req.body

    const postIndex = posts.findIndex(post => post.id === id);

    if (postIndex === -1) {
        return res.status(404).json({
            error: 'Post not found',
            message: `Post con id: ${id} non trovato.`
        });
    }

    const updatedPost = posts[postIndex];

    if (title) updatedPost.title = title;
    if (content) updatedPost.content = content;
    if (tags) updatedPost.tags = tags.map(tag => tag.toLowerCase())


    res.status(200).json(updatedPost)
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