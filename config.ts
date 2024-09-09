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
  fileURL: "http://radio.rx4.ir:8095",
};

export default config;
