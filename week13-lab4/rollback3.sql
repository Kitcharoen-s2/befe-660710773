-- Rollback for migration3.sql
-- ลบตารางตามลำดับที่ถูกต้อง (ลบตารางที่มี foreign key ก่อน)

-- ลบ role_permissions ก่อน (มี foreign key ไปยัง permissions และ roles)
DROP TABLE IF EXISTS role_permissions;

-- ลบ permissions
DROP TABLE IF EXISTS permissions;

-- ลบ indexes (ถ้ายังมีอยู่)
DROP INDEX IF EXISTS idx_permissions_name;
DROP INDEX IF EXISTS idx_permissions_resource;
DROP INDEX IF EXISTS idx_role_perms_role;
DROP INDEX IF EXISTS idx_role_perms_perm;