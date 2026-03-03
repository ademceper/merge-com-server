import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins';
import { ReadonlyVisitor } from '@nestjs/swagger/dist/plugin';

const generator = new PluginMetadataGenerator();
generator.generate({
  visitors: [new ReadonlyVisitor({ classValidatorShim: true, introspectComments: true, pathToSource: __dirname + '/../src' })],
  outputDir: __dirname + '/../src',
  tsconfigPath: 'tsconfig.build.json',
  printDiagnostics: false,
});
