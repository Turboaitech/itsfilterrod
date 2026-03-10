import { content as guideContent } from './complete-guide-cigarette-filter-rod-types';
import { content as capsuleContent } from './capsule-filter-technology-innovation';
import { content as manufacturerContent } from './choosing-filter-rod-manufacturer';

export type BlogContentSection = {
  heading: string;
  content?: string;
  features?: string[];
};

export type LocalizedBlogContent = {
  title: string;
  description: string;
  sections: BlogContentSection[];
};

export type BlogContentMap = {
  [locale: string]: LocalizedBlogContent;
};

export const blogContent: { [slug: string]: BlogContentMap } = {
  'complete-guide-cigarette-filter-rod-types': guideContent,
  'capsule-filter-technology-innovation': capsuleContent,
  'choosing-filter-rod-manufacturer': manufacturerContent,
};

export function getBlogContent(slug: string, locale: string): LocalizedBlogContent | null {
  const content = blogContent[slug];
  if (!content) return null;
  return content[locale] || content['en'] || null;
}
