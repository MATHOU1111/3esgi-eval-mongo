const Comment = require("./../model/comment.model");

/**
 * Méthode pour créer un nouveau commentaire
 * @body
 * {
 *     message: <string>,
 *     userId: <string>,
 *     postId: <string>
 * }
 */
exports.create = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(201).json(newComment);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

/**
 * Méthode pour modifier un commentaire
 * @param id l'id du commentaire à modifier
 * @body
 * {
 *     message: <string>,
 * }
 */
exports.update = async (req, res) => {
  try {
    const commentToUpdate = await Comment.findById(req.params.id);
    if (!commentToUpdate) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    commentToUpdate.message = req.body.message;
    await commentToUpdate.save();
    res.status(200).json({ message: "Commentaire mis à jour" });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

/**
 * Méthode pour supprimer un commentaire
 * @param id l'id du commentaire à supprimer
 */
exports.delete = async (req, res) => {
  try {
    const commentToDelete = await Comment.findById(req.params.id);
    if (!commentToDelete) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    await commentToDelete.deleteOne();
    res.status(200).json({ message: "Commentaire supprimé" });
  } catch (e) {
    res.status(500).json(e.message);
  }
};
