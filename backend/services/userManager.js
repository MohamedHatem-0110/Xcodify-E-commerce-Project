const { userModel, userObject } = require('../models/user');
const { encodeToken, decodeToken } = require('../util/generalUtil');
const {
  comparePassword,
  isValidEmail,
  hashPassword,
} = require('../util/userUtil');

async function emailExists(email) {
  const users = await getUserBy('email', email);
  return users;
}

async function getUserById(id) {
  const user = await userModel.findById(id);
  return user;
}

async function getUserBy(prop, value) {
  const user = await userModel.findOne({ [prop]: value });
  return user;
}

async function loginUser(userEmail, password) {
  const result = await emailExists(userEmail);
  if (!result) throw new Error('You are not registered.');

  const user = await getUserBy('email', userEmail);
  const PasswordMatched = await comparePassword(password, user.password);
  if (!PasswordMatched) {
    throw new Error('Invalid username or password');
  }

  const { email, id } = user;
  user.authToken = await encodeToken({
    email,
    id,
  });
  await user.save();
  user.password = undefined;
  return user;
}

async function registerUser(userEmail, password, firstName, lastName) {
  if (!isValidEmail(userEmail)) throw new Error('Invalid email format.');
  const emailExist = await emailExists(userEmail);
  if (emailExist) throw new Error('You are already registered.');
  const hashedPassword = await hashPassword(password);
  const user = new userModel({
    email: userEmail,
    firstName: firstName,
    lastName: lastName,
    password: hashedPassword,
  });
  const { email, id } = user;
  const sessionToken = await encodeToken({
    email,
    id,
  });
  user.authToken = sessionToken;
  await user.save();
  user.password = undefined;
  return user;
}

async function verifyToken(token) {
  const decodedData = await decodeToken(token).catch((e) => {
    return false;
  });
  if (decodedData.email && decodedData.id) {
    const emailExist = await emailExists(decodedData.email);
    const idVerify = await getUserBy('email', decodedData.email);
    return emailExist && idVerify.id == decodedData.id;
  } else {
    return false;
  }
}

module.exports = {
  loginUser: loginUser,
  registerUser: registerUser,
  verifyToken: verifyToken,
  getUserById: getUserById,
};
