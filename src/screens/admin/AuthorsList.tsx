'use client';

/**
 * Authors List Page
 */

import { useState } from 'react';
import { AppLink } from '@/platform';
import { useAuthors, usePosts } from '@/cms';
import { formatDate } from '@/cms/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, Trash2, Edit } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

export default function AuthorsList() {
  const { authors, remove } = useAuthors();
  const { posts } = usePosts();
  const [search, setSearch] = useState('');

  const getPostCount = (authorId: string) => {
    return posts.filter(p => p.authorId === authorId).length;
  };

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(search.toLowerCase()) ||
    author.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    const postCount = getPostCount(id);
    if (postCount > 0) {
      toast.error('Cannot delete author with existing posts');
      return;
    }
    remove(id);
    toast.success('Author deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="ivy-h2">Authors</h1>
          <p className="text-[hsl(var(--ivy-foreground-muted))]">
            Manage your content creators
          </p>
        </div>
        <Button asChild>
          <AppLink href="/admin/authors/new">
            <Plus className="mr-2 h-4 w-4" />
            New Author
          </AppLink>
        </Button>
      </div>

      {/* Search */}
      <Card padding="sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--ivy-foreground-muted))]" />
          <Input
            placeholder="Search authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Authors Table */}
      <Card padding="none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Posts</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAuthors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-[hsl(var(--ivy-foreground-muted))]">
                  {authors.length === 0 ? 'No authors yet' : 'No authors match your search'}
                </TableCell>
              </TableRow>
            ) : (
              filteredAuthors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell>
                    <AppLink
                      href={`/admin/authors/${author.id}`}
                      className="font-medium hover:text-[hsl(var(--ivy-accent))]"
                    >
                      {author.name}
                    </AppLink>
                    <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] truncate max-w-md">
                      {author.bio}
                    </p>
                  </TableCell>
                  <TableCell>{author.role}</TableCell>
                  <TableCell>{getPostCount(author.id)}</TableCell>
                  <TableCell className="text-[hsl(var(--ivy-foreground-muted))]">
                    {formatDate(author.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <AppLink href={`/admin/authors/${author.id}`}>
                          <Edit className="h-4 w-4" />
                        </AppLink>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete author?</AlertDialogTitle>
                            <AlertDialogDescription>
                              {getPostCount(author.id) > 0 
                                ? `Cannot delete ${author.name} because they have ${getPostCount(author.id)} post(s). Reassign or delete those posts first.`
                                : `This will permanently delete ${author.name}. This action cannot be undone.`
                              }
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            {getPostCount(author.id) === 0 && (
                              <AlertDialogAction onClick={() => handleDelete(author.id)}>
                                Delete
                              </AlertDialogAction>
                            )}
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}


