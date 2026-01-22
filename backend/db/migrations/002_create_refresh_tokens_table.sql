-- 002_create_refresh_tokens_table.sql

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id SERIAL PRIMARY KEY,

  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,

  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Helpful index for cleanup & lookups
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id
  ON refresh_tokens(user_id);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires_at
  ON refresh_tokens(expires_at);
