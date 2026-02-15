import express from "express";
import { isTokenValid, getTokenData } from "../helpers";

const requireLogin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token || !isTokenValid(token)) {
    res.status(401).json({ 
      id: 'UNAUTHORIZED', 
      message: 'Unauthorized. Please provide a valid token' 
    });
    return;
  }

  // Adjuntar datos del usuario al request para uso posterior
  const tokenData = getTokenData(token);
  if (tokenData) {
    (req as any).user = tokenData;
  }
  
  next();
};

export default requireLogin;