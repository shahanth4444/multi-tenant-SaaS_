import React, { useState, useEffect, useCallback } from 'react'
import api from '../api'

export default function Tenants() {
    const [tenants, setTenants] = useState([])
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 })
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    const fetchTenants = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await api.get(`/tenants?page=${page}&limit=10`)
            if (data.success) {
                setTenants(data.data.tenants)
                setPagination(data.data.pagination)
            }
        } catch (error) {
            console.error('Failed to fetch tenants', error)
        } finally {
            setLoading(false)
        }
    }, [page])

    useEffect(() => {
        fetchTenants()
    }, [fetchTenants])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Tenants Management</h1>
            </div>

            {loading ? (
                <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenant Name</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subdomain</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Users</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tenants.map((tenant) => (
                                    <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{tenant.name}</td>
                                        <td className="px-6 py-4 text-gray-600 font-mono text-sm">{tenant.subdomain}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${tenant.status === 'active' ? 'bg-green-100 text-green-700' :
                                                tenant.status === 'suspended' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {tenant.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${tenant.subscriptionPlan === 'enterprise' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                tenant.subscriptionPlan === 'pro' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                    'bg-gray-50 text-gray-600 border-gray-200'
                                                }`}>
                                                {tenant.subscriptionPlan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{tenant.totalUsers}</td>
                                        <td className="px-6 py-4 text-gray-600">{tenant.totalProjects}</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            {new Date(tenant.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="btn btn-secondary text-sm disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-600">
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                                disabled={page === pagination.totalPages}
                                className="btn btn-secondary text-sm disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
