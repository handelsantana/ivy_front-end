/**
 * Platform Adapters
 * 
 * These components abstract platform-specific functionality,
 * making it easy to evolve the platform layer over time.
 * 
 * Current: next/link + react-helmet-async + native img
 * Future: next/image + Next.js Metadata API
 */

export { AppLink } from './AppLink';
export type { AppLinkProps } from './AppLink';

export { AppImage } from './AppImage';
export type { AppImageProps } from './AppImage';

export { HeadMeta } from './HeadMeta';
export type { HeadMetaProps } from './HeadMeta';
