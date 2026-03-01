import { Injectable } from '@nestjs/common';
import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ZodError } from 'zod';
import type { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const result = this.schema.safeParse(value);
      if (!result.success) {
        throw new ZodError(result.error.errors);
      }

      return result.data;
    }
  }
}
