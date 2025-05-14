import { Request, Response, NextFunction } from "express";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();

  console.log(`\n[${timestamp}] Nova requisição recebida:`);
  console.log(`Método: ${req.method}`);
  console.log(`Endpoint: ${req.originalUrl}`);
  console.log(`IP: ${req.ip}`);
  console.log("Headers:", req.headers);
  console.log("Query Parameters:", req.query);
  console.log("Body:", req.body);

  const originalSend = res.send;
  res.send = function (body: any): any {
    console.log(`\n[${timestamp}] Resposta enviada:`);
    console.log(`Status: ${res.statusCode}`);
    console.log("Body:", body);
    return originalSend.call(this, body);
  };

  next();
};

export default requestLogger;
