import * as http from 'node:http';
import * as https from 'node:https';
import type { RequestOptions } from 'node:http';
import safeJsonParse from './safeJsonParse';

export const reqLib = {
  http,
  https,
};

/**
 * Extract hostname, port, and path from a URL
 * @param url {string}
 * @returns {RequestOptions}
 */
export function extractUrlComponents(url: string) {
  try {
    const parsedUrl = new URL(url);
    const allowedProtocols = ['http:', 'https:'];
    if (!allowedProtocols.includes(parsedUrl.protocol)) throw new Error();
    return {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search + parsedUrl.hash,
    };
  } catch (_) {
    throw new Error('Invalid url');
  }
}

/**
 * Nodejs native function for http/https request
 * @param url {string}
 * @param options {RequestOptions}
 * @returns {Promise}
 */
export default async function fetch(
  url: string,
  options?: RequestOptions
): Promise<unknown> | never {
  try {
    if (!url) throw new Error('Url must exists');

    const urlOptions = extractUrlComponents(url);
    const lib = reqLib[urlOptions.port === 443 ? 'https' : 'http'];
    const libOptions = options || urlOptions;

    return new Promise((resolve, reject) => {
      const req = lib.request(libOptions, (res) => {
        let data = '';

        // Listen for data
        res.on('data', (chunk) => {
          data += chunk;
        });

        // Listen for the end of the response
        res.on('end', () => {
          resolve(safeJsonParse(data));
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      // Properly end the request
      req.end();
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
