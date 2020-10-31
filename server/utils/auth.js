const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhhhh';
const expiration = '10h';
// Debug enable
const debug = 1;
module.exports = {
  authMiddleware: function ({ req }) {
    // Token can be sent via req.body/query/headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // Frontend forwarded token = "Bearer <tokenvalue>"; extract out tokenvalue
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }
    if(debug) console.log("Token ID:", token)
    if (!token) {
      return req;
    }
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    }
    catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ email, _id }) {
    const payload = { email, _id };
    return jwt.sign(
      { data: payload },
      secret,
      { expiresIn: expiration }
    );
  }
};