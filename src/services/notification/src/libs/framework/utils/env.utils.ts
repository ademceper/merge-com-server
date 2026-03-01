import { Response as CrossFetchResponse } from 'cross-fetch';

export const getResponse = (): typeof Response => {
  if (typeof Response !== 'undefined') {
    return Response;
  }

  return CrossFetchResponse as unknown as typeof Response;
};

export const getBridgeUrl = async (): Promise<string> => {
  /*
   * Production, staging, or local environments with bring your own local tunnel
   * An escape hatch for unknown use-cases.
   */
  if (process.env.NOVU_BRIDGE_ORIGIN) {
    return `${process.env.NOVU_BRIDGE_ORIGIN}/api/novu`;
  }

  // Vercel preview deployments
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' && process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/novu`;
  }

  // Local environments
  try {
    // biome-ignore lint/suspicious/noExplicitAny: Needed for some edge cases
    if ((process.env.NODE_ENV as string) === 'development' || (process.env.NODE_ENV as string) === 'dev') {
      const response = await fetch('http://localhost:2022/.well-known/novu');
      const data = (await (response as any).json()) as { tunnelOrigin: string; route: string };

      return `${data.tunnelOrigin}${data.route}`;
    }
  } catch (error) {
    console.error(error);
  }

  return '';
};
