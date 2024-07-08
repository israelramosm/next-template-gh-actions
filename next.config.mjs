/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: "/my-next",
  output: "export", // <=== enables static exports
  reactStrictMode: true,
};

export default nextConfig;
