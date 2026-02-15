import { randomUUID } from "crypto";
import { getUserByUsername } from "../data";
import { IUser, IToken } from "../interfaces";

// Token store: { token: { userId, username } }
let tokenStore: Map<string, { userId: string; username: string }> = new Map();

function generateToken(username: string): IToken {
  const user: IUser = getUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }

  const token = randomUUID();
  const iToken: IToken = {
    userId: user.id,
    username,
    token
  };

  tokenStore.set(token, { userId: user.id, username });

  return iToken;
}

function getTokenData(token: string): { userId: string; username: string } | undefined {
  return tokenStore.get(token);
}

function isTokenValid(token: string): boolean {
  return tokenStore.has(token);
}

function revokeToken(token: string): boolean {
  return tokenStore.delete(token);
}

export {
  generateToken,
  getTokenData,
  isTokenValid,
  revokeToken
}