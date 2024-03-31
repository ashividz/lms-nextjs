/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "unitus-lms.s3.ap-south-1.amazonaws.com",
      "localhost",
      "via.placeholder.com",
    ],
  },
};

export default nextConfig;
