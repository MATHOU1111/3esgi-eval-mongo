const {Schema, model} = require('mongoose');
/**
 * Créer ici le model pour post
 * 
 * Un post doit avoir au minimum : un message, une date, un userId (auteur du post) et un postId
 */
const commentSchema = new Schema({
    message: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'post', required: true }
}, { versionKey: false });

module.exports = model('comment', commentSchema);
