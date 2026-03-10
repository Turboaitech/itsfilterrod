export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  tags: string[];
  readingTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'complete-guide-cigarette-filter-rod-types',
    title: 'Complete Guide to Cigarette Filter Rod Types',
    description: 'Learn about different types of cigarette filter rods including mono acetate, dual filters, capsule filters, flavored filters, and shaped filters. Comprehensive comparison for tobacco manufacturers.',
    content: 'complete-guide-cigarette-filter-rod-types',
    author: 'ITS Filter Rod Team',
    publishedAt: '2026-03-11',
    image: '/images/blog/placeholder.svg',
    tags: ['filter-types', 'manufacturing', 'guide'],
    readingTime: 8,
  },
  {
    slug: 'capsule-filter-technology-innovation',
    title: 'Capsule Filter Technology: Innovation in Tobacco Filtration',
    description: 'Discover how capsule filter technology works, available flavors, customization options, and why it\'s becoming the preferred choice for modern cigarette brands.',
    content: 'capsule-filter-technology-innovation',
    author: 'ITS Filter Rod Team',
    publishedAt: '2026-03-11',
    image: '/images/blog/placeholder.svg',
    tags: ['capsule', 'technology', 'innovation'],
    readingTime: 6,
  },
  {
    slug: 'choosing-filter-rod-manufacturer',
    title: 'How to Choose the Right Filter Rod Manufacturer',
    description: 'Essential checklist for selecting a reliable cigarette filter rod supplier. Quality standards, certifications, MOQ, lead times, and customization capabilities explained.',
    content: 'choosing-filter-rod-manufacturer',
    author: 'ITS Filter Rod Team',
    publishedAt: '2026-03-11',
    image: '/images/blog/placeholder.svg',
    tags: ['supplier', 'quality', 'guide'],
    readingTime: 7,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
