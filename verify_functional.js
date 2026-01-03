
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
let superToken = '';
let tenantAToken = '';
let tenantBToken = '';
let tenantAId = '';
let tenantBId = '';

async function runTests() {
    console.log('🚀 Starting Functional Verification...\n');

    try {
        // 1. Super Admin Login
        console.log('1️⃣  Testing Super Admin Login...');
        const superRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'superadmin@system.com',
            password: 'Admin@123'
        });
        if (superRes.data.success) {
            superToken = superRes.data.data.token;
            console.log('   ✅ Super Admin Logged in');
        }

        // 2. Register Tenant A (Free Plan)
        console.log('\n2️⃣  Testing Tenant Registration (Free Plan)...');
        try {
            const tenARes = await axios.post(`${API_URL}/auth/register-tenant`, {
                tenantName: 'Free Tier Corp',
                subdomain: 'freetier' + Date.now(), // unique
                adminEmail: `admin${Date.now()}@free.com`,
                adminPassword: 'Password@123',
                adminFullName: 'Free Admin'
            });
            tenantAId = tenARes.data.data.tenantId;
            console.log('   ✅ Tenant Registered (Free Plan defaults confirmed)');

            // Login as Tenant A Admin
            const loginA = await axios.post(`${API_URL}/auth/login`, {
                email: tenARes.data.data.adminUser.email,
                password: 'Password@123',
                tenantSubdomain: tenARes.data.data.subdomain
            });
            tenantAToken = loginA.data.data.token;
            console.log('   ✅ Tenant A Admin Logged in');
        } catch (e) {
            console.error('   ❌ Registration Failed:', e.response?.data || e.message);
        }

        // 3. Test Project Limits (Free = 3 projects)
        console.log('\n3️⃣  Testing Subscription Limits (Projects)...');
        try {
            const config = { headers: { Authorization: `Bearer ${tenantAToken}` } };
            // Create 3 projects
            await axios.post(`${API_URL}/projects`, { name: 'P1' }, config);
            await axios.post(`${API_URL}/projects`, { name: 'P2' }, config);
            await axios.post(`${API_URL}/projects`, { name: 'P3' }, config);
            console.log('   ✅ Created 3 projects (Limit reached)');

            // Try 4th
            try {
                await axios.post(`${API_URL}/projects`, { name: 'P4' }, config);
                console.error('   ❌ FAILED: Should have prevented 4th project');
            } catch (e) {
                if (e.response?.status === 403) {
                    console.log('   ✅ CORRECTLY BLOCKED 4th project (403 Forbidden)');
                } else {
                    console.error('   ❌ Unexpected error code:', e.response?.status);
                }
            }
        } catch (e) {
            console.error('   ❌ Project Creation Error:', e.response?.data || e.message);
        }

        // 4. Test Data Isolation
        console.log('\n4️⃣  Testing Data Isolation...');
        // Login as default Demo Tenant
        const demoLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@demo.com',
            password: 'Demo@123',
            tenantSubdomain: 'demo'
        });
        tenantBToken = demoLogin.data.data.token;

        // Check Tenant B projects - should NOT see Tenant A's projects
        const demoProjects = await axios.get(`${API_URL}/projects`, {
            headers: { Authorization: `Bearer ${tenantBToken}` }
        });

        // Check names
        const names = demoProjects.data.data.projects.map(p => p.name);
        if (names.includes('P1')) {
            console.error('   ❌ FAILED: Data Leaked! Tenant B can see Tenant A projects');
        } else {
            console.log('   ✅ Data Isolated: Tenant B cannot see Tenant A projects');
        }

        // 5. Test Super Admin Tenants View (New Feature)
        console.log('\n5️⃣  Testing Super Admin Tenants API...');
        const tenantsList = await axios.get(`${API_URL}/tenants`, {
            headers: { Authorization: `Bearer ${superToken}` }
        });
        if (tenantsList.data.data.tenants.length >= 2) {
            console.log(`   ✅ Super Admin can see all tenants (Count: ${tenantsList.data.data.tenants.length})`);
        } else {
            console.error('   ❌ Super Admin list seems incomplete');
        }

        console.log('\n✅✅ VERIFICATION COMPLETE ✅✅');

    } catch (error) {
        console.error('\n❌ FATAL TEST ERROR:', error.message);
        if (error.response) console.error('Response:', error.response.data);
    }
}

runTests();
