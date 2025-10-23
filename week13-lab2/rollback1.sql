-- Rollback for migration1.sql
-- This will undo all changes made by migration1.sql

-- Drop indexes first
DROP INDEX IF EXISTS idx_users_active;
DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_users_username;

-- Drop users table (this will also delete all user data)
DROP TABLE IF EXISTS users;