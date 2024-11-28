function throwError(envVar) {
    throw new Error(`Abort: You need to define ${envVar} in the .env file.`);
  }
  
  if (!process.env.RESEND_API_KEY) {
    throwError('RESEND_API_KEY');
  }
  
  module.exports = {
    reactStrictMode: true,
    // Other Next.js configuration options can go here
  };
  