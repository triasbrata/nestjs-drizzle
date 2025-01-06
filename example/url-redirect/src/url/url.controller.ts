import {
  Body,
  Controller,
  Get,
  HttpRedirectResponse,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { UrlService } from './url.service';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('/')
  public async create(@Body('url') url: string) {
    return this.urlService.createUrl(url);
  }

  @Get('/:slug')
  @Redirect('/', 301)
  public async redirect(@Param('slug') slug: string) {
    const { target } = await this.urlService.getUrlBySlug(slug);

    return {
      url: target,
    } as HttpRedirectResponse;
  }
}
