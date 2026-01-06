export const serverEnv = {
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD!,
  SUPABASE_SERVICE_ROLE_KEY:
    process.env.SUPABASE_SECRET_KEY!,
};