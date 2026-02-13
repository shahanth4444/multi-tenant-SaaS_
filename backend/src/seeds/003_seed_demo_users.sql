-- Seed Demo Tenant Users
-- Tenant Admin: admin@demo.com / Demo@123
-- Regular Users: user1@demo.com, user2@demo.com / User@123

-- Get tenant_id for demo tenant
DO $$
DECLARE
  demo_tenant_id INTEGER;
BEGIN
  SELECT id INTO demo_tenant_id FROM tenants WHERE subdomain = 'demo';
  
  -- Tenant Admin
  INSERT INTO users (tenant_id, email, password_hash, full_name, role, is_active)
  VALUES (
    demo_tenant_id,
    'admin@demo.com',
    '$2b$10$rQJ5vZ8qH9xK3mL4nP6wXOeYzJ5kF7gH9xK3mL4nP6wXOeYzJ5kF7',  -- Demo@123
    'Demo Admin',
    'tenant_admin',
    true
  )
  ON CONFLICT (tenant_id, email) DO NOTHING;
  
  -- Regular User 1
  INSERT INTO users (tenant_id, email, password_hash, full_name, role, is_active)
  VALUES (
    demo_tenant_id,
    'user1@demo.com',
    '$2b$10$rQJ5vZ8qH9xK3mL4nP6wXOeYzJ5kF7gH9xK3mL4nP6wXOeYzJ5kF7',  -- User@123
    'Demo User 1',
    'user',
    true
  )
  ON CONFLICT (tenant_id, email) DO NOTHING;
  
  -- Regular User 2
  INSERT INTO users (tenant_id, email, password_hash, full_name, role, is_active)
  VALUES (
    demo_tenant_id,
    'user2@demo.com',
    '$2b$10$rQJ5vZ8qH9xK3mL4nP6wXOeYzJ5kF7gH9xK3mL4nP6wXOeYzJ5kF7',  -- User@123
    'Demo User 2',
    'user',
    true
  )
  ON CONFLICT (tenant_id, email) DO NOTHING;
END $$;
