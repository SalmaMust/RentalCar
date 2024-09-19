const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token et extraire les informations de l'utilisateur
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ errormessage: 'Token requis pour accéder à cette ressource' });
  }

  try {
    const decoded = jwt.verify(token,  process.env.TOKEN_SECRET );
    res.locals.userId = decoded.id
    res.locals.userRole = decoded.role;
    // req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ errormessage: 'Token invalide ou expiré' });
  }
};

// Middleware pour vérifier si l'utilisateur est un admin
exports.isAdmin = (req, res, next) => {
  if (res.locals.userRole !== 'Admin') {
    return res.status(403).json({ errormessage: 'Accès refusé. Rôle administrateur requis.' });
  }
  next();
};

// Middleware pour vérifier si l'utilisateur est un client
exports.isClient = (req, res, next) => {
  if (res.locals.userRole !== 'Client') {
    return res.status(403).json({ errormessage: 'Accès refusé. Rôle client requis.' });
  }
  next();
};
