import React from 'react';

export const lazyWithRetries: typeof React.lazy = (importer) => {
  const retryImport = async () => {
    try {
      return await importer();
    } catch (error: any) {
      // retry 5 times with 2 second delay and backoff factor of 2 (2, 4, 8, 16, 32 seconds)
      for (let i = 0; i < 5; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** i));
        const url = new URL(error.message.replace('Failed to fetch dynamically imported module: ', '').trim());
        url.searchParams.set('t', `${+new Date()}`);

        try {
          return await import(url.href);
        } catch (e) {
          console.log('retrying import');
        }
      }
      throw error;
    }
  };
  return React.lazy(retryImport);
};
