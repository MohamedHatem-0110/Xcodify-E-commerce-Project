const { Router } = require('express');
const { loginUser, registerUser } = require('../services/userManager');
const userRouter = Router();

userRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(500).send('Invalid email or password');
  try {
    const userDetails = await loginUser(email, password);
    res.status(200).send(userDetails);
  } catch (e) {
    console.log('[ERROR]', e);
    res.status(500).send({ error: e.message });
  }
});

userRouter.post('/register', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName)
    return res.status(500).send('Invalid first name or last name');
  else if (!email || !password)
    return res.status(500).send('Invalid email or password');
  try {
    const userDetails = await registerUser(
      email,
      password,
      firstName,
      lastName
    );
    res.status(200).send(userDetails);
  } catch (e) {
    console.log('[ERROR]', e);
    return res.status(500).send({ error: e.message });
  }
});
console.log('[ROUTER] Loaded api/auth route');

module.exports = userRouter;
