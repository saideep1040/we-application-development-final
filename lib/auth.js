// lib/auth.js
import jwt from "jsonwebtoken";
import cookie from "cookie";

const TOKEN_NAME = "token";

export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
}

export function setTokenCookie(res, token) {
  const serialized = cookie.serialize(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  res.setHeader("Set-Cookie", serialized);
}

export function clearTokenCookie(res) {
  const serialized = cookie.serialize(TOKEN_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  res.setHeader("Set-Cookie", serialized);
}
