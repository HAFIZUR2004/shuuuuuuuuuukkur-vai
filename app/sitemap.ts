import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.growbusinessbd.com';
  
  // Routes to include in sitemap
  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/careers',
    '/contact-us',
    '/vision',
    '/insights',
    '/process',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
