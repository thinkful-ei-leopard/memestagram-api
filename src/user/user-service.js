const bcrypt = require('bcryptjs');
const xss = require('xss');

//The pattern makes 4 checks, for a lower case, an upper case, a number and 1 of the specified "special" characters. 
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UserService = {
  hasUserWithUserName(db, username) {
    return db('user')
      .where({ username })
      .first()
      .then(user => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('user')
      .returning('*')
      .then(([user]) => user);
  },
  validatePassword(password) {
    if (password.length < 6) {
      return 'Password must be longer than 6 characters';
    }
    if (password.length > 30) {
      return 'Password must be less than 30 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain one upper case, lower case, number and special character';
    }
    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  updateUserName(db, id, newName){
    return db('user')
      .where({id})
      .update({username:newName});     
  },
  serializeUser(user) {
    return {
      id: user.id,
      name: user.name,
      username: xss(user.username),
      userImg: user.userImg
    };
  },

};

module.exports = UserService;