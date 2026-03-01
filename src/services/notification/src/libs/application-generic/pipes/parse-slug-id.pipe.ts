import { Injectable } from '@nestjs/common';
import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { parseSlugId } from './parse-slug-id';
import type { InternalId } from './parse-slug-id';

@Injectable()
export class ParseSlugIdPipe implements PipeTransform<string, InternalId> {
  transform(value: string, metadata: ArgumentMetadata): InternalId {
    return parseSlugId(value);
  }
}
