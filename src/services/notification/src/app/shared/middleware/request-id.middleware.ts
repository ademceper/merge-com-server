import { Injectable } from '@nestjs/common';
import type { NestMiddleware } from '@nestjs/common';
import { generateObjectId } from 'libs/application-generic';
import type { NextFunction, Request } from 'express';
import type { Response } from 'express';

export interface RequestWithReqId extends Request {
  _nvRequestId: string;
}

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: RequestWithReqId, _res: Response, next: NextFunction) {
    req._nvRequestId = `req_${generateObjectId()}`;

    next();
  }
}
