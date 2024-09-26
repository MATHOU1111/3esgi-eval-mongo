/**
 * Créer ici le model pour post
 * 
 * Un post doit avoir au minimum : un message, une date, un userId (auteur du post)
 */
const {Schema, model} = require('mongoose');
const postSchema = Schema({
    message: {type: String, required: true},
    date: { type: Date, default: Date.now, required: true},
    userId: {type: Schema.Types.ObjectId, ref: "user", required: true},
    comments : [{type: Schema.Types.ObjectId, ref: "comment"}]
}, {versionKey: false});
module.exports = model('post', postSchema);