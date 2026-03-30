import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL ?? ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const hasDatabaseConfig = Boolean(supabaseUrl && supabaseServiceRoleKey)

export const db = {
  client: hasDatabaseConfig
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null,
  isConfigured: hasDatabaseConfig,
}