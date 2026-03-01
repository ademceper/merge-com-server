import './config/env.config';

// Define framework globals that were previously injected by webpack/bundler
import { version as pkgVersion } from '../package.json';
(globalThis as any).SDK_VERSION = pkgVersion;
(globalThis as any).FRAMEWORK_VERSION = pkgVersion;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nr = require('newrelic');
  if (!nr) throw new Error('newrelic not loaded');
} catch {
  // newrelic is optional - may fail in Bun/ESM environments
}

import { init } from '@sentry/nestjs';
const version = pkgVersion;

if (process.env.SENTRY_DSN) {
  init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    release: `v${version}`,
    ignoreErrors: ['Non-Error exception captured'],
  });
}
