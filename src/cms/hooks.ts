/**
 * CMS React Hooks
 * 
 * Provides reactive state management for CMS data.
 */

import { useState, useEffect, useCallback } from 'react';
import type {
  Post,
  Author,
  HomepageModule,
  Report,
  CreatePostInput,
  UpdatePostInput,
  CreateAuthorInput,
  UpdateAuthorInput,
  CreateModuleInput,
  UpdateModuleInput,
  CreateReportInput,
  UpdateReportInput,
} from './types';
import * as storage from './storage';
import {
  fetchArticles,
  mapArticlesToAuthors,
  mapArticlesToPosts,
  type ArticleApiItem,
} from './api';
import { startGlobalLoading, stopGlobalLoading } from '@/lib/globalLoading';
let inFlightArticlesRequest: Promise<ArticleApiItem[]> | null = null;

function fetchArticlesDeduped(): Promise<ArticleApiItem[]> {
  if (!inFlightArticlesRequest) {
    inFlightArticlesRequest = fetchArticles().finally(() => {
      inFlightArticlesRequest = null;
    });
  }

  return inFlightArticlesRequest;
}

// ─────────────────────────────────────────────────────────────
// Posts Hook
// ─────────────────────────────────────────────────────────────

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    startGlobalLoading();
    try {
      const items = await fetchArticlesDeduped();
      const remotePosts = mapArticlesToPosts(items);
      if (remotePosts.length > 0) {
        setPosts(remotePosts);
      } else {
        setPosts(storage.getPosts());
      }
    } catch (error) {
      console.error('Failed to fetch articles. Falling back to local storage.', error);
      setPosts(storage.getPosts());
    } finally {
      stopGlobalLoading();
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback((input: CreatePostInput) => {
    const post = storage.createPost(input);
    refresh();
    return post;
  }, [refresh]);

  const update = useCallback((input: UpdatePostInput) => {
    const post = storage.updatePost(input);
    refresh();
    return post;
  }, [refresh]);

  const remove = useCallback((id: string) => {
    const result = storage.deletePost(id);
    refresh();
    return result;
  }, [refresh]);

  const publish = useCallback((id: string) => {
    const post = storage.publishPost(id);
    refresh();
    return post;
  }, [refresh]);

  const submitForReview = useCallback((id: string) => {
    const post = storage.updatePost({ id, status: 'review' });
    refresh();
    return post;
  }, [refresh]);

  const approve = useCallback((id: string, note?: string) => {
    const post = storage.updatePost({ id, status: 'approved', reviewNote: note });
    refresh();
    return post;
  }, [refresh]);

  const reject = useCallback((id: string, note: string) => {
    const post = storage.updatePost({ id, status: 'draft', reviewNote: note });
    refresh();
    return post;
  }, [refresh]);

  return {
    posts,
    loading,
    refresh,
    create,
    update,
    remove,
    publish,
    submitForReview,
    approve,
    reject,
    getBySlug: (slug: string) => posts.find(p => p.slug === slug),
    getPublished: () => posts.filter(p => p.status === 'published'),
  };
}

// ─────────────────────────────────────────────────────────────
// Authors Hook
// ─────────────────────────────────────────────────────────────

export function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    startGlobalLoading();
    try {
      const items = await fetchArticlesDeduped();
      const remoteAuthors = mapArticlesToAuthors(items);
      if (remoteAuthors.length > 0) {
        setAuthors(remoteAuthors);
      } else {
        setAuthors(storage.getAuthors());
      }
    } catch (error) {
      console.error('Failed to fetch authors. Falling back to local storage.', error);
      setAuthors(storage.getAuthors());
    } finally {
      stopGlobalLoading();
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback((input: CreateAuthorInput) => {
    const author = storage.createAuthor(input);
    refresh();
    return author;
  }, [refresh]);

  const update = useCallback((input: UpdateAuthorInput) => {
    const author = storage.updateAuthor(input);
    refresh();
    return author;
  }, [refresh]);

  const remove = useCallback((id: string) => {
    const result = storage.deleteAuthor(id);
    refresh();
    return result;
  }, [refresh]);

  return {
    authors,
    loading,
    refresh,
    create,
    update,
    remove,
    getBySlug: (slug: string) => authors.find(a => a.slug === slug),
  };
}

// ─────────────────────────────────────────────────────────────
// Modules Hook
// ─────────────────────────────────────────────────────────────

export function useModules() {
  const [modules, setModules] = useState<HomepageModule[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setModules(storage.getModules());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback((input: CreateModuleInput) => {
    const module = storage.createModule(input);
    refresh();
    return module;
  }, [refresh]);

  const update = useCallback((input: UpdateModuleInput) => {
    const module = storage.updateModule(input);
    refresh();
    return module;
  }, [refresh]);

  const remove = useCallback((id: string) => {
    const result = storage.deleteModule(id);
    refresh();
    return result;
  }, [refresh]);

  const addPost = useCallback((moduleId: string, postId: string) => {
    const module = storage.addPostToModule(moduleId, postId);
    refresh();
    return module;
  }, [refresh]);

  const removePost = useCallback((moduleId: string, postId: string) => {
    const module = storage.removePostFromModule(moduleId, postId);
    refresh();
    return module;
  }, [refresh]);

  return {
    modules,
    loading,
    refresh,
    create,
    update,
    remove,
    addPost,
    removePost,
    getActive: storage.getActiveModules,
  };
}

// ─────────────────────────────────────────────────────────────
// Reports Hook
// ─────────────────────────────────────────────────────────────

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setReports(storage.getReports());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback((input: CreateReportInput) => {
    const report = storage.createReport(input);
    refresh();
    return report;
  }, [refresh]);

  const update = useCallback((input: UpdateReportInput) => {
    const report = storage.updateReport(input);
    refresh();
    return report;
  }, [refresh]);

  const remove = useCallback((id: string) => {
    const result = storage.deleteReport(id);
    refresh();
    return result;
  }, [refresh]);

  return {
    reports,
    loading,
    refresh,
    create,
    update,
    remove,
    getPublished: storage.getPublishedReports,
  };
}

// ─────────────────────────────────────────────────────────────
// Admin Auth Hook (simple localStorage-based)
// ─────────────────────────────────────────────────────────────

const ADMIN_KEY = 'ivy_admin_auth';
const ADMIN_PASSWORD = 'ivy-admin-2024'; // Simple password for prototype

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(ADMIN_KEY);
    setIsAuthenticated(stored === 'true');
    setLoading(false);
  }, []);

  const login = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_KEY);
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    loading,
    login,
    logout,
  };
}
