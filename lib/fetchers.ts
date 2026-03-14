import { unstable_cache } from 'next/cache';
import dbConnect from '@/lib/db';
import Hero from '@/models/Hero';
import Settings from '@/models/Settings';
import Service from '@/models/Service';
import Product from '@/models/Product';
import Portfolio from '@/models/Portfolio';
import Post from '@/models/Post';
import Testimonial from '@/models/Testimonial';
import About from '@/models/About';
import Theme from '@/models/Theme';

// Wrapper for dbConnect to handle errors gracefully during build
async function safeDbConnect() {
  try {
    await dbConnect();
    return true;
  } catch (error) {
    console.warn("Database connection failed during build, using empty data.");
    return false;
  }
}

export const getHeroData = unstable_cache(
  async () => {
    if (!(await safeDbConnect())) return null;
    try {
      const hero = await Hero.findOne().lean();
      if (!hero) return null;
      return JSON.parse(JSON.stringify(hero));
    } catch { return null; }
  },
  ['hero-data'],
  { tags: ['hero'] }
);

export const getSettingsData = unstable_cache(
  async () => {
    if (!(await safeDbConnect())) return {};
    try {
      const settings = await Settings.findOne().lean();
      return JSON.parse(JSON.stringify(settings || {}));
    } catch { return {}; }
  },
  ['settings-data'],
  { tags: ['settings'] }
);

export const getServicesData = unstable_cache(
  async () => {
    if (!(await safeDbConnect())) return [];
    try {
      const services = await Service.find({}).sort({ order: 1 }).lean();
      return JSON.parse(JSON.stringify(services));
    } catch { return []; }
  },
  ['services-data'],
  { tags: ['services'] }
);

export const getProductsData = unstable_cache(
  async () => {
    if (!(await safeDbConnect())) return [];
    try {
      const products = await Product.find({}).sort({ createdAt: -1 }).lean();
      return JSON.parse(JSON.stringify(products));
    } catch { return []; }
  },
  ['products-data'],
  { tags: ['products'] }
);

export const getPortfoliosData = unstable_cache(
  async () => {
    if (!(await safeDbConnect())) return [];
    try {
      const portfolios = await Portfolio.find({}).sort({ createdAt: -1 }).lean();
      return JSON.parse(JSON.stringify(portfolios));
    } catch { return []; }
  },
  ['portfolios-data'],
  { tags: ['portfolio'] }
);

export const getPortfolioById = unstable_cache(
  async (id: string) => {
    if (!(await safeDbConnect())) return null;
    try {
      const portfolio = await Portfolio.findById(id).lean();
      if (!portfolio) return null;
      return JSON.parse(JSON.stringify(portfolio));
    } catch { return null; }
  },
  ['portfolio-detail'],
  { tags: ['portfolio'] }
);

export const getPostsData = unstable_cache(
  async () => {
    if (!(await safeDbConnect())) return [];
    try {
      const posts = await Post.find({}).sort({ date: -1 }).lean();
      return JSON.parse(JSON.stringify(posts));
    } catch { return []; }
  },
  ['posts-data'],
  { tags: ['posts'] }
);

export const getPostBySlug = unstable_cache(
  async (slug: string) => {
    if (!(await safeDbConnect())) return null;
    try {
      const post = await Post.findOne({ slug }).lean();
      if (!post) return null;
      return JSON.parse(JSON.stringify(post));
    } catch { return null; }
  },
  ['post-detail'],
  { tags: ['posts'] }
);

export const getTestimonialsData = unstable_cache(
  async () => {
    if (!(await safeDbConnect())) return [];
    try {
      const testimonials = await Testimonial.find({}).lean();
      return JSON.parse(JSON.stringify(testimonials));
    } catch { return []; }
  },
  ['testimonials-data'],
  { tags: ['testimonials'] }
);

export const getAboutData = unstable_cache(
  async () => {
    if (!(await safeDbConnect())) return null;
    try {
      const about = await About.findOne().lean();
      if (!about) return null;
      return JSON.parse(JSON.stringify(about));
    } catch { return null; }
  },
  ['about-data'],
  { tags: ['about'] }
);

export const getThemeData = unstable_cache(
  async () => {
    if (!(await safeDbConnect())) return null;
    try {
      const theme = await Theme.findOne().lean();
      if (!theme) return null;
      return JSON.parse(JSON.stringify(theme));
    } catch { return null; }
  },
  ['theme-data'],
  { tags: ['theme'] }
);
