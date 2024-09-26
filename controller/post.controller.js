const Post = require("./../model/post.model");

/**
 * Methode pour récupérer 10 post (les plus récents) par page
 * @param page le numéro de la page actuelle
 * Si la page est 1 il faut récupérer les 10 post les plus récents
 * Si la page est 2 il faut récupérer les post du 11ème au 20ème les plus récents
 * ...
 */
exports.getAll = async (req, res) => {
    try{
        let page = req.params.page;
        let limit = 1;
        let pages = (page - 1) * limit;
        const post = await Post.find().sort({date: -1}).skip(pages).limit(limit);
        res.status(200).json(post);
    }catch(e){
        res.status(500).json(e.message);
    }
}

/**
 * Methode pour récupérer un post par son id, et les commentaires associés à ce post
 */
exports.getById = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id).populate("comments");
        if (!post) {
            return res.status(404).json({ message: "Le post n'existe pas"});
        }
        res.status(200).json(post);
    } catch (e) {
        res.status(500).json(e.message);
    }
}

/**
 * Methode pour créer un nouveau post (attention à bien enregistrer la date de création)
 * @body
 * {
 *     message: <string>,
 *     userId: <string>
 * }
 */
exports.create = async (req, res) => {
    try{
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(201).json(newPost);
    }catch(e){
        res.status(500).json(e.message);
    }
}

/**
 * Methode pour modifier un post (attention de bien mettre à jour la date du post)
 * @param id l'id du post à modifier
 * @body
 * {
 *     message: <string>
 * }
 */
exports.update = async (req, res) => {
    try{
        const message = req.body.message;
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{message, date: new Date()})
        res.status(201).json({message: "Post mis à jour"});
        if (!updatedPost) {
            return res.status(404).json({ message: "Post non trouvé" });
        }
    }catch(e){
        res.status(500).json(e.message);
    }
}

/**
 * Methode pour supprimer un post (attention de bien supprimer les commentaires associés)
 * @param id l'id du post à supprimer
 */
exports.delete = async (req, res) => {
    try{
        const postToDelete = await Post.findById(req.params.id);
        if(!postToDelete)
        {
            res.status(404).json({message: "Le post n'existe pas"});
        }
        await postToDelete.deleteOne();
        res.status(200).json({message: "Post supprimé"});
    }catch(e){
        res.status(500).json(e.message);
    }
}
