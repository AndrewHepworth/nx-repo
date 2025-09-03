import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'yarn nx run food-pages:serve',
        production: 'yarn nx run food-pages:preview',
      },
      ciWebServerCommand: 'yarn nx run food-pages:preview',
      ciBaseUrl: 'http://localhost:4300',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
