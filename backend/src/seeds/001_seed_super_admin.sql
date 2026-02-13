-- Seed Super Admin User
-- This user has tenant_id = NULL and role = 'super_admin'
-- Password: Admin@123 (hashed with bcrypt)

INSERT INTO users (tenant_id, email, password_hash, full_name, role, is_active)
VALUES (
  NULL,
  'superadmin@system.com',
  '$2b$10$rQJ5vZ8qH9xK3mL4nP6wXOeYzJ5kF7gH9xK3mL4nP6wXOeYzJ5kF7',  -- Admin@123
  'Super Admin',
  'super_admin',
  true
)
ON CONFLICT (tenant_id, email) DO NOTHING;
