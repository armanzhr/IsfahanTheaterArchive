const config = {
  auth: {
    enabled: false,
  },
  payments: {
    enabled: true,
  },
  features: {
    blog: true,
  },
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
};

export default config;
