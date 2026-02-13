'use client';

/**
 * Homepage Modules Management
 */

import { useState } from 'react';
import { useModules, usePosts } from '@/cms';
import { formatDate } from '@/cms/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, GripVertical, X, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { slugify } from '@/cms/utils';

export default function ModulesList() {
  const { modules, create, update, remove, addPost, removePost } = useModules();
  const { posts } = usePosts();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');
  const [newModuleMax, setNewModuleMax] = useState('5');

  const publishedPosts = posts.filter(p => p.status === 'published');

  const handleCreateModule = () => {
    if (!newModuleName.trim()) {
      toast.error('Module name is required');
      return;
    }

    create({
      name: newModuleName,
      slug: slugify(newModuleName),
      position: modules.length + 1,
      postIds: [],
      maxPosts: parseInt(newModuleMax) || 5,
      isActive: true,
    });

    setNewModuleName('');
    setNewModuleMax('5');
    setIsCreateOpen(false);
    toast.success('Module created');
  };

  const handleToggleActive = (moduleId: string, isActive: boolean) => {
    update({ id: moduleId, isActive });
    toast.success(isActive ? 'Module activated' : 'Module deactivated');
  };

  const handleAddPost = (moduleId: string, postId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (module && module.postIds.length >= module.maxPosts) {
      toast.error(`Module can only have ${module.maxPosts} posts`);
      return;
    }
    addPost(moduleId, postId);
    toast.success('Post added to module');
  };

  const handleRemovePost = (moduleId: string, postId: string) => {
    removePost(moduleId, postId);
    toast.success('Post removed from module');
  };

  const handleDeleteModule = (moduleId: string) => {
    remove(moduleId);
    toast.success('Module deleted');
  };

  const getPostTitle = (postId: string) => {
    return posts.find(p => p.id === postId)?.title || 'Unknown post';
  };

  const getAvailablePosts = (modulePostIds: string[]) => {
    return publishedPosts.filter(p => !modulePostIds.includes(p.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="ivy-h2">Homepage Modules</h1>
          <p className="text-[hsl(var(--ivy-foreground-muted))]">
            Curate content for your homepage sections
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Module
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Module</DialogTitle>
              <DialogDescription>
                Add a new homepage section to curate content.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Module Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Featured, Top Stories, Editor's Picks"
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max">Max Posts</Label>
                <Input
                  id="max"
                  type="number"
                  min="1"
                  max="20"
                  value={newModuleMax}
                  onChange={(e) => setNewModuleMax(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateModule}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {modules.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-[hsl(var(--ivy-foreground-muted))]">
              No modules yet. Create your first homepage section.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {modules.map((module) => (
            <Card key={module.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-4">
                  <GripVertical className="h-5 w-5 text-[hsl(var(--ivy-foreground-muted))] cursor-move" />
                  <div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
                      Position {module.position} • {module.postIds.length}/{module.maxPosts} posts
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={module.isActive}
                      onCheckedChange={(checked) => handleToggleActive(module.id, checked)}
                    />
                    <Label className="text-sm">{module.isActive ? 'Active' : 'Inactive'}</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteModule(module.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Pinned Posts */}
                <div className="space-y-3">
                  {module.postIds.length === 0 ? (
                    <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] py-4">
                      No posts pinned yet
                    </p>
                  ) : (
                    module.postIds.map((postId, index) => (
                      <div
                        key={postId}
                        className="flex items-center justify-between rounded-md border border-[hsl(var(--ivy-border))] px-3 py-2"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
                            {index + 1}
                          </span>
                          <span className="font-medium">{getPostTitle(postId)}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemovePost(module.id, postId)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Post */}
                {module.postIds.length < module.maxPosts && (
                  <div className="mt-4">
                    <Select onValueChange={(postId) => handleAddPost(module.id, postId)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Add a published post..." />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailablePosts(module.postIds).length === 0 ? (
                          <SelectItem value="none" disabled>
                            No available posts
                          </SelectItem>
                        ) : (
                          getAvailablePosts(module.postIds).map((post) => (
                            <SelectItem key={post.id} value={post.id}>
                              {post.title}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

