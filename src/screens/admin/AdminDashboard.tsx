'use client';

/**
 * Admin Dashboard
 */

import { usePosts, useAuthors, useModules, useReports } from '@/cms';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText, Users, LayoutGrid, FileBarChart, Clock, CheckCircle } from 'lucide-react';
import { AppLink } from '@/platform';
import { getStatusColor } from '@/cms/utils';

export default function AdminDashboard() {
  const { posts } = usePosts();
  const { authors } = useAuthors();
  const { modules } = useModules();
  const { reports } = useReports();

  const reviewPosts = posts.filter(p => p.status === 'review');
  const approvedPosts = posts.filter(p => p.status === 'approved');
  const publishedPosts = posts.filter(p => p.status === 'published');

  const stats = [
    { label: 'Total Posts', value: posts.length, icon: FileText, href: '/admin/posts' },
    { label: 'Authors', value: authors.length, icon: Users, href: '/admin/authors' },
    { label: 'Modules', value: modules.length, icon: LayoutGrid, href: '/admin/modules' },
    { label: 'Reports', value: reports.length, icon: FileBarChart, href: '/admin/reports' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="ivy-h2">Dashboard</h1>
        <p className="text-[hsl(var(--ivy-foreground-muted))]">
          Manage your content and editorial workflow
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <AppLink key={stat.label} href={stat.href}>
            <Card hover className="h-full">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">{stat.label}</p>
                    <p className="mt-1 text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-[hsl(var(--ivy-foreground-muted)/0.5)]" />
                </div>
              </CardContent>
            </Card>
          </AppLink>
        ))}
      </div>

      {/* Workflow Status */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Review */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              Pending Review ({reviewPosts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reviewPosts.length === 0 ? (
              <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
                No posts awaiting review
              </p>
            ) : (
              <ul className="space-y-3">
                {reviewPosts.slice(0, 5).map((post) => (
                  <li key={post.id}>
                    <AppLink
                      href={`/admin/posts/${post.id}`}
                      className="block hover:bg-[hsl(var(--ivy-background-muted))] -mx-2 px-2 py-2 rounded"
                    >
                      <p className="font-medium truncate">{post.title}</p>
                      <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] truncate">
                        {post.dek}
                      </p>
                    </AppLink>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Ready to Publish */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              Ready to Publish ({approvedPosts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {approvedPosts.length === 0 ? (
              <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
                No posts ready to publish
              </p>
            ) : (
              <ul className="space-y-3">
                {approvedPosts.slice(0, 5).map((post) => (
                  <li key={post.id}>
                    <AppLink
                      href={`/admin/posts/${post.id}`}
                      className="block hover:bg-[hsl(var(--ivy-background-muted))] -mx-2 px-2 py-2 rounded"
                    >
                      <p className="font-medium truncate">{post.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor('approved')}`}>
                          Approved
                        </span>
                      </div>
                    </AppLink>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
              No posts yet. <AppLink href="/admin/posts/new" className="text-[hsl(var(--ivy-accent))] hover:underline">Create your first post</AppLink>
            </p>
          ) : (
            <div className="space-y-3">
              {posts.slice(0, 5).map((post) => (
                <AppLink
                  key={post.id}
                  href={`/admin/posts/${post.id}`}
                  className="flex items-center justify-between hover:bg-[hsl(var(--ivy-background-muted))] -mx-2 px-2 py-2 rounded"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{post.title}</p>
                    <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
                      {post.format} • {post.vertical}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                </AppLink>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


