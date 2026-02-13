'use client';

/**
 * Post Editor Page
 */

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  usePosts, 
  useAuthors, 
  type Post, 
  type PostFormat, 
  type Vertical, 
  type Pillar,
  type PostStatus 
} from '@/cms';
import { slugify, getStatusColor } from '@/cms/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ArrowLeft, 
  Save, 
  Send, 
  CheckCircle, 
  XCircle, 
  Globe,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  dek: z.string().min(1, 'Dek is required'),
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
  format: z.string().min(1, 'Format is required'),
  vertical: z.string().min(1, 'Vertical is required'),
  pillar: z.string().min(1, 'Pillar is required'),
  authorId: z.string().min(1, 'Author is required'),
  body: z.string().min(1, 'Body content is required'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogImage: z.string().optional(),
  canonicalUrl: z.string().optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

const formats: { value: PostFormat; label: string }[] = [
  { value: 'deep-dive', label: 'Deep Dive' },
  { value: 'guide', label: 'Guide' },
  { value: 'index', label: 'Index' },
  { value: 'news', label: 'News' },
  { value: 'opinion', label: 'Opinion' },
  { value: 'interview', label: 'Interview' },
  { value: 'case-study', label: 'Case Study' },
];

const verticals: { value: Vertical; label: string }[] = [
  { value: 'ai', label: 'AI' },
  { value: 'creator-economy', label: 'Creator Economy' },
  { value: 'business', label: 'Business' },
  { value: 'culture', label: 'Culture' },
  { value: 'technology', label: 'Technology' },
];

const pillars: { value: Pillar; label: string }[] = [
  { value: 'tools', label: 'Tools' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'trends', label: 'Trends' },
  { value: 'people', label: 'People' },
  { value: 'analysis', label: 'Analysis' },
];

export default function PostEditor() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === 'new';
  
  const { posts, create, update, submitForReview, approve, reject, publish } = usePosts();
  const { authors } = useAuthors();
  
  const [post, setPost] = useState<Post | null>(null);
  const [reviewNote, setReviewNote] = useState('');

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      slug: '',
      dek: '',
      heroImage: '',
      heroImageAlt: '',
      format: 'news',
      vertical: 'ai',
      pillar: 'analysis',
      authorId: '',
      body: '',
      metaTitle: '',
      metaDescription: '',
      ogImage: '',
      canonicalUrl: '',
    },
  });

  // Load existing post
  useEffect(() => {
    if (!isNew && id) {
      const existing = posts.find(p => p.id === id);
      if (existing) {
        setPost(existing);
        form.reset({
          title: existing.title,
          slug: existing.slug,
          dek: existing.dek,
          heroImage: existing.heroImage || '',
          heroImageAlt: existing.heroImageAlt || '',
          format: existing.format,
          vertical: existing.vertical,
          pillar: existing.pillar,
          authorId: existing.authorId,
          body: existing.body,
          metaTitle: existing.seo.metaTitle || '',
          metaDescription: existing.seo.metaDescription || '',
          ogImage: existing.seo.ogImage || '',
          canonicalUrl: existing.seo.canonicalUrl || '',
        });
      }
    }
  }, [id, isNew, posts, form]);

  // Auto-generate slug from title
  const watchTitle = form.watch('title');
  useEffect(() => {
    if (isNew && watchTitle) {
      form.setValue('slug', slugify(watchTitle));
    }
  }, [watchTitle, isNew, form]);

  const onSubmit = (values: PostFormValues) => {
    const postData = {
      title: values.title,
      slug: values.slug,
      dek: values.dek,
      heroImage: values.heroImage,
      heroImageAlt: values.heroImageAlt,
      format: values.format as PostFormat,
      vertical: values.vertical as Vertical,
      pillar: values.pillar as Pillar,
      authorId: values.authorId,
      body: values.body,
      seo: {
        metaTitle: values.metaTitle,
        metaDescription: values.metaDescription,
        ogImage: values.ogImage,
        canonicalUrl: values.canonicalUrl,
      },
      status: (post?.status || 'draft') as PostStatus,
    };

    if (isNew) {
      const newPost = create(postData);
      toast.success('Post created');
      router.push(`/admin/posts/${newPost.id}`);
    } else if (post) {
      update({ id: post.id, ...postData });
      toast.success('Post saved');
    }
  };

  const handleSubmitForReview = () => {
    if (post) {
      submitForReview(post.id);
      setPost({ ...post, status: 'review' });
      toast.success('Post submitted for review');
    }
  };

  const handleApprove = () => {
    if (post) {
      approve(post.id, reviewNote);
      setPost({ ...post, status: 'approved' });
      toast.success('Post approved');
    }
  };

  const handleReject = () => {
    if (post && reviewNote) {
      reject(post.id, reviewNote);
      setPost({ ...post, status: 'draft' });
      toast.success('Post returned to draft');
    } else {
      toast.error('Please add a review note');
    }
  };

  const handlePublish = () => {
    if (post && post.status === 'approved') {
      publish(post.id);
      setPost({ ...post, status: 'published' });
      toast.success('Post published');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/admin/posts')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="ivy-h3">{isNew ? 'New Post' : 'Edit Post'}</h1>
            {post && (
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(post.status)}`}>
                  {post.status}
                </span>
                {post.reviewNote && (
                  <span className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
                    Note: {post.reviewNote}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push('/admin/posts')}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter post title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="url-friendly-slug" {...field} />
                        </FormControl>
                        <FormDescription>URL-friendly identifier</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dek"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dek (Subtitle)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Brief summary or subtitle" rows={2} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body (Markdown)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write your content in Markdown..." 
                            rows={20} 
                            className="font-mono text-sm"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Use Markdown for formatting. Headings will be extracted for jump links.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* SEO */}
              <Card>
                <CardHeader>
                  <CardTitle>SEO</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title</FormLabel>
                        <FormControl>
                          <Input placeholder="SEO title (defaults to post title)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="SEO description (150-160 chars)" rows={2} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ogImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OG Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Workflow Actions */}
              {post && (
                <Card>
                  <CardHeader>
                    <CardTitle>Workflow</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {post.status === 'draft' && (
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={handleSubmitForReview}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Submit for Review
                      </Button>
                    )}

                    {post.status === 'review' && (
                      <>
                        <div className="space-y-2">
                          <Label>Review Note</Label>
                          <Textarea
                            placeholder="Add feedback..."
                            value={reviewNote}
                            onChange={(e) => setReviewNote(e.target.value)}
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1" 
                            variant="outline"
                            onClick={handleReject}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Return
                          </Button>
                          <Button 
                            className="flex-1"
                            onClick={handleApprove}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                        </div>
                      </>
                    )}

                    {post.status === 'approved' && (
                      <Button 
                        className="w-full"
                        onClick={handlePublish}
                      >
                        <Globe className="mr-2 h-4 w-4" />
                        Publish
                      </Button>
                    )}

                    {post.status === 'published' && (
                      <div className="text-center py-4">
                        <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                        <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
                          Published on {new Date(post.publishedAt!).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle>Metadata</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="authorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select author" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {authors.map((author) => (
                              <SelectItem key={author.id} value={author.id}>
                                {author.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Format</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {formats.map((format) => (
                              <SelectItem key={format.value} value={format.value}>
                                {format.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vertical"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vertical</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {verticals.map((v) => (
                              <SelectItem key={v.value} value={v.value}>
                                {v.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pillar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pillar</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {pillars.map((p) => (
                              <SelectItem key={p.value} value={p.value}>
                                {p.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Hero Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Hero Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="heroImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="heroImageAlt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alt Text</FormLabel>
                        <FormControl>
                          <Input placeholder="Describe the image" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
