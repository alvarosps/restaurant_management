/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CURRENT_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
