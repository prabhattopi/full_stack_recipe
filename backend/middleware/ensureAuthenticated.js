// backend/middleware/ensureAuthenticated.js
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware/handler
    }
    res.status(401).json({ message: 'Unauthorized' }); // User is not authenticated
  }
  
  module.exports = ensureAuthenticated;
  