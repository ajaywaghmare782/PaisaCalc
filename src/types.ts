export enum ActiveView {
  HOME = 'HOME',
  EMI_CALC = 'EMI_CALC',
  SIP_CALC = 'SIP_CALC',
  TAX_CALC = 'TAX_CALC',
  FD_RD_CALC = 'FD_RD_CALC',
  PPF_CALC = 'PPF_CALC',
  HRA_CALC = 'HRA_CALC',
  GST_CALC = 'GST_CALC',
  GRATUITY_CALC = 'GRATUITY_CALC',
  BLOG_LISTING = 'BLOG_LISTING',
  BLOG_POST = 'BLOG_POST',
  ABOUT = 'ABOUT',
  PRIVACY = 'PRIVACY',
  DISCLAIMER = 'DISCLAIMER'
}

export type ParagraphBlockType = 
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'cta'; text: string; actionView: ActiveView };

export interface BlogPostType {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: ParagraphBlockType[];
}
