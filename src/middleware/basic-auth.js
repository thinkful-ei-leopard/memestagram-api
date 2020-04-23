const AuthService = require('../auth/auth-service');

function requireAuth(res, req, next){
  const authToken = req.get('Authorization') || '';

  let basicToken;
  if(!authToken.toLowerCase().startsWith('basic ')){
    return res.status(401).json({
      error: 'Missing Basic Token'
    });
  }else{
    basicToken = authToken.slice('basic '.length, authToken.length);
  }

  const [tokenUserName, tokenPassword] = Buffer
    .from(basicToken, 'base64')
    .toString()
    .split(':');
    
  if(!tokenUserName||!tokenPassword){
    return res.status(400).json({
      error:'Unauthorized request'
    });
  }

  req.app.get('db')('user')
    .where({ user_name: tokenUserName})
    .first()
    .then(user =>{
      if(!user){
        return res.status(401).json({
          error:'Unauthorized request'
        });
      }
      return AuthService.comparePasswords(tokenPassword, user.password)
        .then(passwordsMatch =>{
          if(!passwordsMatch){
            return res.status(401).json({
              error:'Unauthorized request'
            });
          }
          req.user = user;
          next();
        });
    })
    .catch(next);
}

  

module.exports ={
  requireAuth
};