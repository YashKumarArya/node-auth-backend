-- 002_add_role.sql
ALTER TABLE users
ADD COLUMN role TEXT DEFAULT 'user';
