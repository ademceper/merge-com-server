import path from 'node:path';
import { getContextPath, getEnvFileNameForNodeEnv, NovuComponentEnum } from 'libs/shared';
import dotenv from 'dotenv';

const envFileName = getEnvFileNameForNodeEnv(process.env.NODE_ENV) ?? '.env';
// Use path relative to project root (CWD) since __dirname may differ between Node CJS and Bun ESM
dotenv.config({ path: path.resolve('src', envFileName) });

export const CONTEXT_PATH = getContextPath(NovuComponentEnum.API);
