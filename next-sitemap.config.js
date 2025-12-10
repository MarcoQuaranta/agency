/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: 'https://www.safescale.it',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/auth/', '/dashboard'] },
    ],
  },
  exclude: ['/api/*', '/auth/*', '/dashboard', '/components'],
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/servizi' || path === '/chi-siamo' || path === '/contatti') {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path === '/privacy-policy') {
      priority = 0.3;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
