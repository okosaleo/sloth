/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ufts.io",
                port: "",
                pathname: "/f/**"
            }
        ]
    }
};

export default nextConfig;
