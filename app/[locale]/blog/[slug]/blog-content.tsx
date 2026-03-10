'use client';

import { useRawT } from '@/lib/i18n/use-raw-t';
import { Link } from '@/lib/i18n/navigation';
import type { BlogPost } from '@/data/blog';
import { ArrowLeft } from 'lucide-react';

interface BlogContentProps {
  post: BlogPost;
}

export function BlogContent({ post }: BlogContentProps) {
  const t = useRawT();

  // Get translated content or fallback to content key
  const getContent = (key: string) => {
    const translated = t(`blog.${post.slug}.${key}`);
    return translated !== `blog.${post.slug}.${key}` ? translated : null;
  };

  const title = getContent('title') || post.title;
  const description = getContent('description') || post.description;
  const content = getContent('content');

  return (
    <div className="page page-blog-post">
      <article className="max-w-4xl mx-auto p-[10px] lg:p-[30px]">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Blog</span>
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 bg-white/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-300 mb-6">{description}</p>
          <div className="flex items-center gap-4 text-gray-400">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <DefaultContent slug={post.slug} />
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold mb-4">
            {t('Get In Touch') || 'Get In Touch'}
          </h3>
          <p className="text-gray-300 mb-6">
            {t('If you need any of our ') || 'If you need any of our '}
            <Link href="/product" className="underline font-bold">
              {t('products') || 'products'}
            </Link>
            {t(', please fill in the form. Our team is here to assist you every step of the way.') || ', please contact us.'}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </article>
    </div>
  );
}

function DefaultContent({ slug }: { slug: string }) {
  const contents: Record<string, JSX.Element> = {
    'complete-guide-cigarette-filter-rod-types': (
      <>
        <h2>Introduction to Cigarette Filter Rods</h2>
        <p>
          Cigarette filter rods are essential components in modern cigarette manufacturing,
          designed to reduce harmful substances while maintaining the desired smoking experience.
          As a leading manufacturer based in Batam, Indonesia, we offer a comprehensive range
          of filter rod solutions to meet diverse market demands.
        </p>

        <h2>1. Mono Acetate Filter Rods</h2>
        <p>
          Mono Acetate Filter Rods are the most traditional and widely used filter type globally.
          They are produced by wrapping cellulose acetate tow with plug-wrap paper.
        </p>
        <h3>Key Features:</h3>
        <ul>
          <li>Available lengths: 96mm - 132mm per filter rod</li>
          <li>Available diameters: King size, Slim size, Super Slim size</li>
          <li>Classic design, most welcomed by traditional brands</li>
          <li>Customizable configurations based on customer specifications</li>
        </ul>

        <h2>2. Dual Filter Rods</h2>
        <p>
          Dual Filter Rods feature two segments within a single filter, combining different
          materials for enhanced filtration performance.
        </p>
        <h3>Common Combinations:</h3>
        <ul>
          <li>Charcoal segment + Mono acetate segment</li>
          <li>Capsule segment + Acetate segment</li>
          <li>Colored thread segment + Charcoal segment</li>
        </ul>
        <p>
          This design improves tar and nicotine retention while allowing brands to differentiate
          their products strategically.
        </p>

        <h2>3. Capsule Filter Rods</h2>
        <p>
          Capsule filters contain flavor-releasing capsule balls that can be activated by the
          consumer. When squeezed, the capsule releases flavored liquid that enhances the
          smoking experience.
        </p>
        <h3>Available Flavors:</h3>
        <ul>
          <li>Menthol</li>
          <li>Apple, Blueberry, Strawberry, Cherry</li>
          <li>Vanilla, Coffee, Mint</li>
          <li>Custom flavors available upon request</li>
        </ul>

        <h2>4. Flavored Filter Rods</h2>
        <p>
          Flavored filters are created by spraying flavor compounds onto mono acetate filters.
          We use vacuum packing to preserve flavor quality during storage and shipping.
        </p>

        <h2>5. Shaped Filter Rods</h2>
        <h3>Outer Shaped Filters</h3>
        <p>
          Feature distinctive fluted outer shapes that enhance tar retention and provide
          unique visual appeal at the mouth end.
        </p>
        <h3>Inner Shaped (Tube) Filters</h3>
        <p>
          Feature various inner shapes including circle, star, heart, square, and triangle
          patterns that differentiate brands and improve filtering function.
        </p>

        <h2>6. Recessed Filter Rods</h2>
        <p>
          Recessed filters feature a hollow space (5-7mm depth) at the mouth end, providing
          a unique smoking perception and avoiding direct contact with cellulose acetate.
        </p>

        <h2>Choosing the Right Filter Type</h2>
        <p>
          Selection depends on several factors including target market preferences, brand
          positioning, regulatory requirements, and production capabilities. Our team can
          help you evaluate options and develop custom solutions.
        </p>

        <h2>Quality Assurance</h2>
        <p>
          All our filter rods are manufactured following international quality standards.
          We offer sample testing and prototyping services to ensure products meet your
          exact specifications before full production.
        </p>
      </>
    ),
    'capsule-filter-technology-innovation': (
      <>
        <h2>The Rise of Capsule Filter Technology</h2>
        <p>
          Capsule filter technology represents one of the most significant innovations in
          cigarette filtration over the past decade. By incorporating breakable capsules
          containing flavored liquids, manufacturers can offer consumers an interactive
          and customizable smoking experience.
        </p>

        <h2>How Capsule Filters Work</h2>
        <p>
          A capsule filter contains one or more small balls filled with concentrated flavor
          liquid. These capsules are embedded within the filter material during manufacturing.
          When the consumer applies pressure to the filter, the capsule breaks and releases
          its contents, infusing the smoke with flavor.
        </p>

        <h2>Types of Capsule Configurations</h2>
        <h3>Single Capsule</h3>
        <p>
          The most common design featuring one capsule per filter. Ideal for brands
          introducing capsule technology to their lineup.
        </p>
        <h3>Dual Capsule</h3>
        <p>
          Features two capsules that can contain the same or different flavors, allowing
          consumers to customize their experience.
        </p>
        <h3>Multi-Segment Capsule</h3>
        <p>
          Combines capsule segments with charcoal or other filtration materials for
          enhanced performance.
        </p>

        <h2>Popular Flavor Categories</h2>
        <ul>
          <li><strong>Menthol:</strong> The most popular capsule flavor globally</li>
          <li><strong>Fruit:</strong> Apple, blueberry, strawberry, cherry, grape</li>
          <li><strong>Specialty:</strong> Vanilla, coffee, mint variations</li>
          <li><strong>Custom:</strong> Proprietary blends developed with clients</li>
        </ul>

        <h2>Manufacturing Considerations</h2>
        <p>
          Capsule filter production requires specialized equipment and quality control
          processes to ensure:
        </p>
        <ul>
          <li>Consistent capsule placement</li>
          <li>Proper activation pressure</li>
          <li>Flavor stability during storage</li>
          <li>Uniform flavor release</li>
        </ul>

        <h2>Market Trends</h2>
        <p>
          Capsule cigarettes continue to gain market share in many regions, particularly
          in Asia and Latin America. The technology appeals to younger adult smokers
          seeking variety and the ability to modify their smoking experience.
        </p>

        <h2>Customization Options</h2>
        <p>
          At ITS Filter Rod, we offer complete capsule filter customization including:
        </p>
        <ul>
          <li>Custom flavor development</li>
          <li>Capsule size and placement</li>
          <li>Activation pressure adjustment</li>
          <li>Combined filtration technologies</li>
        </ul>
      </>
    ),
    'choosing-filter-rod-manufacturer': (
      <>
        <h2>Why Manufacturer Selection Matters</h2>
        <p>
          Your filter rod supplier directly impacts product quality, consistency, and
          ultimately your brand reputation. This guide outlines key factors to evaluate
          when selecting a manufacturing partner.
        </p>

        <h2>Quality Standards & Certifications</h2>
        <p>
          Verify that potential suppliers maintain internationally recognized quality
          management systems and relevant industry certifications. Ask about:
        </p>
        <ul>
          <li>Quality control processes at each production stage</li>
          <li>Testing equipment and capabilities</li>
          <li>Traceability systems</li>
          <li>Compliance with international standards</li>
        </ul>

        <h2>Production Capabilities</h2>
        <h3>Product Range</h3>
        <p>
          Evaluate whether the manufacturer offers the full range of filter types you
          need now and may require in the future:
        </p>
        <ul>
          <li>Mono acetate filters</li>
          <li>Dual and multi-segment filters</li>
          <li>Capsule filters</li>
          <li>Flavored filters</li>
          <li>Shaped filters (inner and outer)</li>
        </ul>

        <h3>Customization</h3>
        <p>
          Can the manufacturer develop custom solutions? Consider:
        </p>
        <ul>
          <li>Custom lengths and diameters</li>
          <li>Proprietary flavor development</li>
          <li>Unique shapes or configurations</li>
          <li>Private labeling capabilities</li>
        </ul>

        <h2>Minimum Order Quantities (MOQ)</h2>
        <p>
          Understand MOQ requirements and how they align with your needs:
        </p>
        <ul>
          <li>Standard MOQ for regular products</li>
          <li>Sample quantities for testing</li>
          <li>Flexibility for initial orders</li>
          <li>Volume discounts for larger orders</li>
        </ul>

        <h2>Lead Times & Delivery</h2>
        <p>
          Reliable delivery is crucial for production planning:
        </p>
        <ul>
          <li>Standard production lead times</li>
          <li>Rush order capabilities</li>
          <li>Shipping options and logistics support</li>
          <li>Track record for on-time delivery</li>
        </ul>

        <h2>Pricing Structure</h2>
        <p>
          While price is important, consider total value:
        </p>
        <ul>
          <li>Base pricing and volume tiers</li>
          <li>Additional costs (tooling, samples, shipping)</li>
          <li>Payment terms</li>
          <li>Currency and exchange rate considerations</li>
        </ul>

        <h2>Communication & Support</h2>
        <p>
          Effective partnership requires clear communication:
        </p>
        <ul>
          <li>Dedicated account management</li>
          <li>Language capabilities</li>
          <li>Response time expectations</li>
          <li>Technical support availability</li>
        </ul>

        <h2>Why Choose ITS Filter Rod</h2>
        <p>
          Based in Batam, Indonesia, we offer:
        </p>
        <ul>
          <li>Complete range of filter rod types</li>
          <li>Competitive pricing with flexible MOQ</li>
          <li>Fast delivery: 20ft container in 3 days, 40ft in 8 days</li>
          <li>Full customization capabilities</li>
          <li>Multilingual support team</li>
          <li>International quality standards</li>
        </ul>
      </>
    ),
  };

  return contents[slug] || <p>Content coming soon...</p>;
}
