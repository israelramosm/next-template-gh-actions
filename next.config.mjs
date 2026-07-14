/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for GitHub Pages. Produces the site in ./out
  output: 'export',
  // GitHub Pages has no image optimization server, so disable it.
  images: {
    unoptimized: true,
  },
  // When deploying to a project page (https://<user>.github.io/<repo>), set the
  // repository name below so assets and routes resolve under the subpath.
  // The Pages workflow (configure-pages) injects this automatically in CI.
  // basePath: '/next-template-gh-actions',
};

export default nextConfig;
