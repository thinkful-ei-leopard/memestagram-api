/*app.post('/user-setting', bodyParser.json(), stormpath.loginRequired, function (req, res) {
  function writeError(message) {
    res.status(400);
    res.json({ message: message, status: 400 });
    res.end();
  }
  
  function saveAccount() {
    req.user.name = req.body.name;
    req.user.username = req.body.username;
  
    req.user.save(function (err) {
      if (err) {
        return writeError(err.userMessage || err.message);
      }
      res.end();
    });
  }
  
  if (req.body.password) {
    var application = req.app.get('stormpathApplication');
  
    application.authenticateAccount({
      username: req.user.username,
      password: req.body.existingPassword
    }, function (err) {
      if (err) {
        return writeError('The existing password that you entered was incorrect.');
      }
  
      req.user.password = req.body.password();
  
      saveAccount();
    });
  } else {
    saveAccount();
  }
});*/