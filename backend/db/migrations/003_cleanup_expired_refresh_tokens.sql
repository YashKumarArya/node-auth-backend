-- 003_cleanup_expired_refresh_tokens.sql
-- (optional utility migration)

CREATE OR REPLACE FUNCTION cleanup_expired_refresh_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM refresh_tokens
  WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;
