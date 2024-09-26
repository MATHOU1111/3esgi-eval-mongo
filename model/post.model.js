/**
 * Créer ici le model pour post
 * 
 * Un post doit avoir au minimum : un message, une date, un userId (auteur du post)
 */
const {Schema,model} = require('mongoose');
const postSchema = mongoose.Schema({
    message: {type: string, required: true},
    date: { type: Date, default: Date.now, required: true},
    userId: {type: Schema.Types.ObjectId, ref: "user", required: true}
}, {versionKey: false});
module.exports = mongoose.model('post', postSchema);