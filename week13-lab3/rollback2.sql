-- Rollback for migration2.sql
-- This will undo all changes made by migration2.sql

-- Drop indexes for user_roles
DROP INDEX IF EXISTS idx_user_roles_role;
DROP INDEX IF EXISTS idx_user_roles_user;

-- Drop user_roles table (foreign key constraint will be removed)
DROP TABLE IF EXISTS user_roles;

-- Drop index for roles
DROP INDEX IF EXISTS idx_roles_name;

-- Drop roles table
DROP TABLE IF EXISTS roles;