/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_S3_URL: string;
  readonly VITE_NOTIFICATION_WS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
