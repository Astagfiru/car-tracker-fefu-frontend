import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './src/shared/api/openapi/specification/openapi.yaml',
  output: './src/shared/api/openapi/client',
  plugins: ['@hey-api/client-axios'],
});
