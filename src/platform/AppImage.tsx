import React from 'react';
import { cn } from '@/lib/utils';

/**
 * AppImage - Platform adapter for optimized images
 * 
 * Currently wraps native <img> element with explicit dimensions for CLS.
 * For Next.js migration: swap to next/image
 * 
 * @example
 * <AppImage 
 *   src="/hero.jpg" 
 *   alt="Hero image" 
 *   width={1200} 
 *   height={600} 
 * />
 */

export interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Explicit width (required for CLS compliance) */
  width: number;
  /** Explicit height (required for CLS compliance) */
  height: number;
  /** Additional CSS classes */
  className?: string;
  /** Priority loading hint (currently uses eager loading) */
  priority?: boolean;
  /** Native loading attribute */
  loading?: 'lazy' | 'eager';
  /** Object fit style */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export const AppImage = React.forwardRef<HTMLImageElement, AppImageProps>(
  ({ 
    src, 
    alt, 
    width, 
    height, 
    className, 
    priority = false,
    loading,
    objectFit = 'cover',
    style,
    ...props 
  }, ref) => {
    // Determine loading strategy
    const loadingAttr = loading ?? (priority ? 'eager' : 'lazy');

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loadingAttr}
        decoding={priority ? 'sync' : 'async'}
        className={cn(className)}
        style={{
          objectFit,
          ...style,
        }}
        {...props}
      />
    );
  }
);

AppImage.displayName = 'AppImage';

export default AppImage;
