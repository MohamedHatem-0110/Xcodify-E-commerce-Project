const { hash, compare } = require('bcryptjs');

async function hashPassword(password) {
  const hashedPassword = await hash(password, 8); // Salt rounds: 8
  return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
  const result = await compare(password, hashedPassword);
  return result;
}

function isValidEmail(email) {
  return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
}

module.exports = {
  hashPassword: hashPassword,
  comparePassword: comparePassword,
  isValidEmail: isValidEmail,
};
