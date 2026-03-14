import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  contentHtml?: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  tags: string[];
  readingTime: number;
  locale?: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  tags: string[];
  readingTime: number;
}

const contentDirectory = path.join(process.cwd(), 'content/blog');

// Get all blog post slugs
export function getAllBlogSlugs(): string[] {
  try {
    const files = fs.readdirSync(contentDirectory);
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/, ''));
  } catch {
    return [];
  }
}

// Get blog post metadata (for listing)
export function getBlogPostMeta(slug: string, locale: string = 'en'): BlogPostMeta | null {
  try {
    // Try locale-specific file first
    let fullPath = path.join(contentDirectory, `${slug}.${locale}.md`);
    
    if (!fs.existsSync(fullPath)) {
      // Fall back to default (English)
      fullPath = path.join(contentDirectory, `${slug}.md`);
    }
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      author: data.author || 'ITS Filter Rod Team',
      publishedAt: data.publishedAt || data.date || new Date().toISOString().split('T')[0],
      updatedAt: data.updatedAt,
      image: data.image || '/images/blog/placeholder.svg',
      tags: data.tags || [],
      readingTime: data.readingTime || 5,
    };
  } catch {
    return null;
  }
}

// Get full blog post with HTML content
export async function getBlogPost(slug: string, locale: string = 'en'): Promise<BlogPost | null> {
  try {
    // Try locale-specific file first
    let fullPath = path.join(contentDirectory, `${slug}.${locale}.md`);
    
    if (!fs.existsSync(fullPath)) {
      // Fall back to default (English)
      fullPath = path.join(contentDirectory, `${slug}.md`);
    }
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      content: content,
      contentHtml,
      author: data.author || 'ITS Filter Rod Team',
      publishedAt: data.publishedAt || data.date || new Date().toISOString().split('T')[0],
      updatedAt: data.updatedAt,
      image: data.image || '/images/blog/placeholder.svg',
      tags: data.tags || [],
      readingTime: data.readingTime || 5,
      locale,
    };
  } catch {
    return null;
  }
}

// Get all blog posts metadata (for listing page)
export function getAllBlogPosts(locale: string = 'en'): BlogPostMeta[] {
  const slugs = getAllBlogSlugs();
  const posts = slugs
    .map((slug) => {
      // Remove locale suffix if present
      const baseSlug = slug.replace(/\.(en|zh|id|vi|ms|ja|ko)$/, '');
      return getBlogPostMeta(baseSlug, locale);
    })
    .filter((post): post is BlogPostMeta => post !== null);

  // Remove duplicates and sort by date
  const uniquePosts = Array.from(
    new Map(posts.map((post) => [post.slug, post])).values()
  );

  return uniquePosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
