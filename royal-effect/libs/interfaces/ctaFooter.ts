interface CtaFooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface CtaFooterProps {
  headingLead?: string;
  headingHighlight?: string;
  description?: string;
  primaryLink?: CtaFooterLink;
  secondaryLink?: CtaFooterLink;
  className?: string;
}

export type { CtaFooterLink, CtaFooterProps };