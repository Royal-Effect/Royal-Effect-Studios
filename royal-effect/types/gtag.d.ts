// Extends the Window interface to include gtag for Google Analytics Consent Mode
interface Window {
  gtag: (...args: any[]) => void;
  dataLayer: Record<string, any>[];
}
