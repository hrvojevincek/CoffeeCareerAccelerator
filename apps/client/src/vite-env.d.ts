// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROD_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
