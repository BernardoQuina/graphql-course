declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string
      NODE_ENV: 'development' | 'production'
      PORT: number
      ORIGIN: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
    }
  }
}

export {}