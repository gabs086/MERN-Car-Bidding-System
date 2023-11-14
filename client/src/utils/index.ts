import { ComponentType, lazy } from 'react';

type ImportComponent = () => Promise<{ default: ComponentType }>;

export const lazyWithRetries = (importComponent: ImportComponent) =>
   lazy((async () => {
      const isPageHasBeenForceRefreshed = JSON.parse(
         localStorage.getItem('page-has-been-force-refreshed') || 'false'
      );

      try {
         const component = await importComponent();

         localStorage.setItem('page-has-been-force-refreshed', 'false');

         return component;
      } catch (error) {
         if (!isPageHasBeenForceRefreshed) {
            localStorage.setItem('page-has-been-force-refreshed', 'true');
            return window.location.reload();
         }

         throw error;
      }
   }) as ImportComponent);
