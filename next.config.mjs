/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações otimizadas para Vercel
  serverExternalPackages: ['axios'],
  // Permitir domínios externos para imagens se necessário
  images: {
    domains: []
  }
};

export default nextConfig;
