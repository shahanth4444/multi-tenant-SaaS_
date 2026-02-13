-- Seed Demo Projects
-- Project Alpha and Project Beta for Demo Company

DO $$
DECLARE
  demo_tenant_id INTEGER;
  admin_user_id INTEGER;
BEGIN
  SELECT id INTO demo_tenant_id FROM tenants WHERE subdomain = 'demo';
  SELECT id INTO admin_user_id FROM users WHERE email = 'admin@demo.com' AND tenant_id = demo_tenant_id;
  
  -- Project Alpha
  INSERT INTO projects (tenant_id, name, description, status, created_by)
  VALUES (
    demo_tenant_id,
    'Project Alpha',
    'First demo project',
    'active',
    admin_user_id
  )
  ON CONFLICT DO NOTHING;
  
  -- Project Beta
  INSERT INTO projects (tenant_id, name, description, status, created_by)
  VALUES (
    demo_tenant_id,
    'Project Beta',
    'Second demo project',
    'active',
    admin_user_id
  )
  ON CONFLICT DO NOTHING;
END $$;
