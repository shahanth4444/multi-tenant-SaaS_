-- Seed Demo Tenant
-- Subdomain: demo
-- Subscription Plan: pro
-- Max Users: 25, Max Projects: 15

INSERT INTO tenants (name, subdomain, status, subscription_plan, max_users, max_projects)
VALUES (
  'Demo Company',
  'demo',
  'active',
  'pro',
  25,
  15
)
ON CONFLICT (subdomain) DO NOTHING;
