import express from "express";
import createError from "http-errors";
import User from "../Models/User.model.js";
import { loginSchema, registerSchema } from "../Helpers/validation_schema.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../Helpers/jwt_helper.js";
import axios from "axios";
const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await registerSchema.validateAsync(req.body);

    const doesExist = await User.findOne({ email: result.email });
    if (doesExist)
      throw createError.Conflict(`${result.email} is already been registered`);

    const user = new User(result);
    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(savedUser.id);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi) {
      error.status = 422;
    }
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await loginSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });

    if (!user) throw createError.NotFound("User not registered");

    const isMatch = await user.isPasswordValid(result.password);
    if (!isMatch)
      throw createError.Unauthorized("Email or password is incorrect");

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi) {
      return next(createError.BadRequest("Invalid email or password"));
    }
    next(error);
  }
});

router.post("/refresh-token", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);

    res.send({ accessToken: accessToken, refreshToken: refToken });
  } catch (error) {
    next(error);
  }
});

router.delete("/logout", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    // TODO: delete refresh token from database
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

router.post("/github-login", async (req, res, next) => {
  try {
    const { code } = req.body;
    console.log(code);

    const result = await axios.post(
      `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    const accessToken = result.data.split("&")[0].split("access_token=")[1];
    res.json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/save-github-user", async (req, res, next) => {
  try {
    const { accessToken } = req.body;
    const result = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { login, id } = result.data;
    const user = await User.findOne({ email: `${login}@github.com` });
    if (!user) {
      const newUser = new User({
        firstName: login,
        lastName: login,
        email: `${login}@github.com`,
        password: id,
      });
      const savedUser = await newUser.save();
      savedUser.password = undefined;
        return res.json({
            userId: savedUser._id,
        });
    }
    res.json({
        userId: user._id
    })
  } catch (error) {
    next(error);
  }
});

router.post("/save-google-user", async (req, res, next) => {
    try {
        const { accessToken } = req.body;
        
        const result = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json",
            },
          }
        );

        const { id, email, given_name, family_name } = result.data;

        const user = await User.findOne({ email: email });
        console.log(user);
        if (!user) {
            const newUser = new User({
                firstName: given_name,
                lastName: family_name,
                email: email,
                password: id,
            });
            const savedUser = await newUser.save();
            savedUser.password = undefined;
            console.log(savedUser._id);
            return res.json({
                userId: savedUser._id,
            });
        }
        res.json({
            userId: user._id
        })
        console.log(user._id);
        
    } catch (error) {
        next(error);
    }
})

export default router;
