import { Router } from 'express';
import { BlogPost, CmsPage } from '../../src/types';

const contactMessages: any[] = [];

export function createContentRoutes(
  blogPosts: BlogPost[],
  cmsPages: CmsPage[]
) {
  const router = Router();

  // ─── Contact Messages ───────────────────────────────────────────────────────

  // POST submit contact message from website
  router.post('/contact', (req, res) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    const newMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      phone: phone || '',
      message,
      createdAt: new Date().toISOString(),
      status: 'UNREAD',
    };
    contactMessages.unshift(newMessage);
    res.json({ success: true, message: 'Message received successfully', data: newMessage });
  });

  // GET all contact messages (for Admin Panel)
  router.get('/admin/contact-messages', (req, res) => {
    res.json(contactMessages);
  });

  // PUT update contact message status (e.g. mark as READ)
  router.put('/admin/contact-messages/:id', (req, res) => {
    const msg = contactMessages.find((m) => m.id === req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    if (req.body.status) msg.status = req.body.status;
    res.json(msg);
  });

  // ─── Blog Routes ───────────────────────────────────────────────────────────


  // ─── Blog Routes ───────────────────────────────────────────────────────────

  // GET all blog posts
  router.get('/blogs', (req, res) => {
    res.json(blogPosts);
  });

  // GET single blog post by slug
  router.get('/blogs/:slug', (req, res) => {
    const post = blogPosts.find(
      (b) => b.slug === req.params.slug || b.id === req.params.slug
    );
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  });

  // POST create a new blog post (admin)
  router.post('/admin/blogs', (req, res) => {
    const newPost: BlogPost = {
      ...req.body,
      id: `blog-${Date.now()}`,
      publishedAt: new Date().toISOString().split('T')[0],
    };
    blogPosts.unshift(newPost);
    res.json(newPost);
  });

  // ─── CMS Routes ────────────────────────────────────────────────────────────

  // GET a CMS page by slug
  router.get('/cms/:slug', (req, res) => {
    const page = cmsPages.find((p) => p.slug === req.params.slug);
    if (!page) return res.status(404).json({ message: 'Page not found' });
    res.json(page);
  });

  // PUT update a CMS page (admin)
  router.put('/admin/cms/:slug', (req, res) => {
    const page = cmsPages.find((p) => p.slug === req.params.slug);
    if (!page) return res.status(404).json({ message: 'Page not found' });
    page.content = req.body.content;
    page.title = req.body.title || page.title;
    page.updatedAt = new Date().toISOString().split('T')[0];
    res.json(page);
  });

  return router;
}
