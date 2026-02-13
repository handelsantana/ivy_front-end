'use client';

import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * HeadMeta - Comprehensive SEO/GEO meta tags with JSON-LD support
 * 
 * Supports:
 * - Title format: "{Page Title} | IVY Edition"
 * - Canonical URLs (base: https://ivyedition.com)
 * - Open Graph + Twitter Cards
 * - JSON-LD (Article, Organization)
 */

const SITE_NAME = 'IVY Edition';
const SITE_URL = 'https://ivyedition.com';
const DEFAULT_DESCRIPTION = 'Ideas, Vision, Yield — Premium editorial coverage of AI, creator economy, business, and culture.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;
const TWITTER_HANDLE = '@ivyedition';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export interface ArticleMetadata {
  headline: string;
  description: string;
  image?: string;
  authorName: string;
  authorUrl?: string;
  datePublished: string;
  dateModified?: string;
  section?: string;
  tags?: string[];
}

export interface HeadMetaProps {
  /** Page title (will append "| IVY Edition") */
  title: string;
  /** Meta description for SEO (max 160 chars) */
  description?: string;
  /** Path for canonical URL (will prepend site URL) */
  canonicalPath?: string;
  /** Open Graph image URL (absolute) */
  ogImage?: string;
  /** Open Graph type */
  ogType?: 'website' | 'article';
  /** Disable title suffix */
  noSuffix?: boolean;
  /** Article-specific metadata for JSON-LD */
  article?: ArticleMetadata;
  /** Disable indexing */
  noIndex?: boolean;
}

// ─────────────────────────────────────────────────────────────
// JSON-LD Schemas
// ─────────────────────────────────────────────────────────────

function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://twitter.com/ivyedition',
      'https://linkedin.com/company/ivyedition',
    ],
    description: DEFAULT_DESCRIPTION,
  };
}

function getArticleSchema(article: ArticleMetadata, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image || DEFAULT_OG_IMAGE,
    author: {
      '@type': 'Person',
      name: article.authorName,
      url: article.authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: article.section,
    keywords: article.tags?.join(', '),
  };
}

function getWebPageSchema(title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export const HeadMeta: React.FC<HeadMetaProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath,
  ogImage,
  ogType = 'website',
  noSuffix = false,
  article,
  noIndex = false,
}) => {
  // Format title with suffix
  const formattedTitle = noSuffix ? title : `${title} | ${SITE_NAME}`;
  
  // Build canonical URL
  const canonicalUrl = canonicalPath 
    ? `${SITE_URL}${canonicalPath.startsWith('/') ? '' : '/'}${canonicalPath}`
    : undefined;
  
  // Use article image, provided image, or default
  const imageUrl = ogImage || article?.image || DEFAULT_OG_IMAGE;
  
  // Truncate description to 160 chars
  const truncatedDescription = description.length > 160 
    ? description.slice(0, 157) + '...' 
    : description;

  // Build JSON-LD
  const jsonLd = article 
    ? getArticleSchema(article, canonicalUrl || SITE_URL)
    : getWebPageSchema(formattedTitle, truncatedDescription, canonicalUrl || SITE_URL);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={truncatedDescription} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={truncatedDescription} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={canonicalUrl || SITE_URL} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={truncatedDescription} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Article-specific meta */}
      {article && (
        <>
          <meta property="article:published_time" content={article.datePublished} />
          {article.dateModified && (
            <meta property="article:modified_time" content={article.dateModified} />
          )}
          <meta property="article:author" content={article.authorName} />
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags?.map((tag, i) => (
            <meta key={i} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      
      {/* Organization Schema (always include) */}
      <script type="application/ld+json">
        {JSON.stringify(getOrganizationSchema())}
      </script>
    </Helmet>
  );
};

export default HeadMeta;
