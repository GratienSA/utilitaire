// const validator = require("validator");

// const RegistrationData = async (req, res, next) => {
//   const { nom, prenom, email, password, adresse, code_postal, ville, phone } = req.body;

//   // Vérification des champs requis
//   if (!nom || !prenom || !email || !password || !adresse || !code_postal || !ville || !phone) {
//     return res.status(400).json({ message: "Tous les champs sont obligatoires" });
//   }

//   // Validation de l'email
//   if (!validator.isEmail(email)) {
//     return res.status(400).json({ message: "L'adresse e-mail est invalide" });
//   }

//   // Validation de l'unicité de l'email
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ message: "L'adresse e-mail est déjà utilisée" });
//   }

//   if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
//     return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères, inclure des lettres majuscules, des lettres minuscules, des chiffres et des caractères spéciaux" });
//   }

//   // Validation du format du numéro de téléphone en France
//   if (!validator.isMobilePhone(phone, "fr-FR")) {
//     return res.status(400).json({ message: "Le numéro de téléphone est invalide pour la France" });
//   }

//   // Validation de l'adresse et du code postal en France
//   const regexCodePostal = /^[0-9]{5}$/; 
//   if (!regexCodePostal.test(code_postal)) {
//     return res.status(400).json({ message: "Le code postal est invalide pour la France" });
//   }

//   req.body = { nom, prenom, email, password, adresse, code_postal, ville, phone };
//   next();
// };

// const authenticateUser = async (req, res, next) => {
//   const { email, password } = req.body;

//   // Vérification des champs requis
//   if (!email || !password) {
//     return res.status(400).json({ message: "L'adresse e-mail et le mot de passe sont obligatoires" });
//   }

//   // Validation de l'email
//   if (!validator.isEmail(email)) {
//     return res.status(400).json({ message: "L'adresse e-mail est invalide" });
//   }

  
//   req.body = { email, password };
//   next();
// };

// module.exports = {RegistrationData, authenticateUser };

