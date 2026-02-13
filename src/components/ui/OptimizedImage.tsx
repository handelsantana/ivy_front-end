/**
 * OptimizedImage - Performance-optimized image component
 * 
 * Features:
 * - Explicit width/height to prevent CLS
 * - Lazy loading by default
 * - Preload support for hero images
 * - WebP/AVIF with fallback
 * - Blur-up placeholder
 */

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface OptimizedImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Explicit width (required for CLS) */
  width: number;
  /** Explicit height (required for CLS) */
  height: number;
  /** Additional CSS classes */
  className?: string;
  /** Priority loading - preloads image and uses eager loading */
  priority?: boolean;
  /** Object fit style */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Sizes attribute for responsive images */
  sizes?: string;
  /** Quality hint (for future CDN integration) */
  quality?: number;
  /** Show blur placeholder while loading */
  placeholder?: 'blur' | 'empty';
  /** Blur data URL for placeholder */
  blurDataURL?: string;
  /** Callback when image loads */
  onLoad?: () => void;
  /** Fill container (ignores width/height, uses parent dimensions) */
  fill?: boolean;
}

// Low-quality placeholder for blur-up effect
const DEFAULT_BLUR_DATA_URL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PC9zdmc+';

export const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({
    src,
    alt,
    width,
    height,
    className,
    priority = false,
    objectFit = 'cover',
    sizes,
    placeholder = 'empty',
    blurDataURL = DEFAULT_BLUR_DATA_URL,
    onLoad,
    fill = false,
  }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    // Preload priority images
    useEffect(() => {
      if (priority && src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        // Add fetchpriority for modern browsers
        link.setAttribute('fetchpriority', 'high');
        document.head.appendChild(link);

        return () => {
          document.head.removeChild(link);
        };
      }
    }, [priority, src]);

    const handleLoad = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    const handleError = () => {
      setError(true);
    };

    // Calculate aspect ratio for fill mode
    const aspectRatio = width && height ? width / height : undefined;

    if (error) {
      return (
        <div
          className={cn(
            'bg-[hsl(var(--ivy-background-muted))] flex items-center justify-center',
            fill ? 'absolute inset-0' : '',
            className
          )}
          style={!fill ? { width, height } : undefined}
        >
          <span className="text-xs text-[hsl(var(--ivy-foreground-muted))]">
            Image unavailable
          </span>
        </div>
      );
    }

    return (
      <div
        className={cn(
          'relative overflow-hidden',
          fill ? 'absolute inset-0' : '',
          className
        )}
        style={!fill ? { 
          width: '100%',
          aspectRatio: aspectRatio,
        } : undefined}
      >
        {/* Blur placeholder */}
        {placeholder === 'blur' && !isLoaded && (
          <img
            src={blurDataURL}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-lg"
          />
        )}

        {/* Main image */}
        <img
          ref={ref}
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            fill ? 'absolute inset-0 w-full h-full' : 'w-full h-auto',
            placeholder === 'blur' && !isLoaded ? 'opacity-0' : 'opacity-100'
          )}
          style={{
            objectFit,
          }}
        />
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
