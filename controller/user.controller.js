const User = require("./../model/user.model");
const bcrypt = require("bcrypt");

/**
 * Methode pour la connexion utilisateur
 * @body
 * {
 *     login: <string>,
 *     password: <string>
 * }
 */
exports.login = async (req,res) => {
    try{
        //TODO
        if(req.body.login === undefined || req.body.password === undefined){
            return res.status(400).json({ message: 'Veulliez remplir les champs demandée'});
        }
        let user = await User.findOne({login: req.body.login});
        if(!user){
            return res.status(401).json({ message: 'Utilisateur introuvable.' }); // Si le login n'est pas égal
        }else if(user && !bcrypt.compareSync(req.body.password, user.password)){
            return res.status(403).json({ message: 'Mot de passe invalide.' }); // Le le login est validé, on vérifie les mots de passes avec bcrypt
        }else{
            return res.status(200).json({ message: 'Connexion réussie.' });
        }
    }catch(e){
        res.status(500).json(e.message);
    }
}

/**
 * Méthode pour la création d'un compte utilisateur
 * @body
 * {
 *     email: <string>,
 *     password: <string>,
 *     username: <string>
 * }
 */
exports.signin= async (req,res) => {
    try{
        //TODO
        let newUser = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password,10) // hash du mot de passe
        }
        let result = await User.create(newUser);    
        res.status(201).json(result);
    }catch(e){
        res.status(500).json(e.message);
    }
}