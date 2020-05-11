module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dunder_mifflin@localhost/memestagram',  
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL ||'postgresql://dunder_mifflin@localhost/memestagram-test',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',

  CLIENT_ORGIN: process.env.CLIENT_ORGIN ||'http://localhost:3000/'


}