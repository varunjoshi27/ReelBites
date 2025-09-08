const foodPartnerModel = require('../models/foodpartner.model');
const jwt = require('jsonwebtoken');

/* Cookies have a property that whenever the data is saved in the cookie then it comes to the server on every request */

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: 'Please Login First',
    });
  }
}
