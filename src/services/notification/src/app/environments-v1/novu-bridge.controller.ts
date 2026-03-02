import { Controller, Get, Inject, Options, Post, Req, Res } from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { NovuClient } from 'libs/framework/servers/nest';
import type { Request, Response } from 'express';
import { NovuBridgeClient } from './novu-bridge-client';

@Controller('/environments/:environmentId/bridge')
@ApiTags('Bridge')
@ApiExcludeController()
export class NovuBridgeController {
  constructor(@Inject(NovuClient) private novuService: NovuBridgeClient) {}

  @Get()
  async handleGet(@Req() req: Request, @Res() res: Response) {
    await this.novuService.handleRequest(req, res);
  }

  @Post()
  async handlePost(@Req() req: Request, @Res() res: Response) {
    await this.novuService.handleRequest(req, res);
  }

  @Options()
  async handleOptions(@Req() req: Request, @Res() res: Response) {
    await this.novuService.handleRequest(req, res);
  }
}
