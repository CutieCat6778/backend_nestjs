/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const origins = process.env.ORIGINS.split(',')

    if (origins.indexOf(req.header('Origin'))) {
      res.header('Access-Control-Allow-Origin', req.header('Origin'));
      res.header('Access-Control-Allow-Headers', 'content-type');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    }

    next();
  }
}
