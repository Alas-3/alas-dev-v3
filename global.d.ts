declare module '*.css' {
  const content: string;
  export default content;
}

declare module './globals.css'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export {}
