import express from "express";
import { validateCredentials } from "../data";
import { generateToken } from "../helpers";
import { ERRORS } from "../../../helpers/errors";
import type { IUser } from "../interfaces";

const router = express.Router();

// POST - Login
router.route("/login").post(function (req, res) {
  try {
    const { username, password } = req.body;

    // Validar que se envíen username y password
    if (!username || !password) {
      const error = ERRORS.INVALID_CREDENTIALS;
      res.status(error.status).json({ id: error.id, message: error.message });
      return;
    }

    // Validar credenciales
    const user = validateCredentials(username, password);
    if (!user) {
      const error = ERRORS.INVALID_CREDENTIALS;
      res.status(error.status).json({ id: error.id, message: error.message });
      return;
    }

    // Generar token
    const tokenData = generateToken(username);

    // Retornar usuario sin contraseña + token
    const userResponse = {
      id: user.id,
      username: user.username,
      name: user.name,
      surname: user.surname,
      bio: user.bio,
      profileImg: user.profileImg,
      registrationDate: user.registrationDate
    };

    res.status(200).json({
      user: userResponse,
      token: tokenData.token
    });
  } catch (error) {
    const err = ERRORS.INTERNAL_SERVER_ERROR;
    res.status(err.status).json({ id: err.id, message: err.message, error: error.message });
  }
});

module.exports = router;
