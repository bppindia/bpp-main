import { useQuery } from '@tanstack/react-query'
import { getData } from '@/api/apiClient'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { asApiResponse } from '@/types/api'

// Define types for dashboard data
export interface DashboardData {
    totalMembersIndia: number
    totalMembersState: number
    cases?: {
        totalCases: number
        pendingCases: number
    }
    referrals: {
        totalReferrals: number
        successfulReferrals: number
        pendingReferrals: number
        referralEarnings: number
        referralCode: string | null
        referralLink: string | null
    }
    wallet: {
        balance: number
        totalContributions: number
        recentTransactions: Array<{
            id: number
            amount: number
            type: string
            description: string
            status: string
            category: string
            createdAt: string
        }>
    }
    totalProfessionalsState: number
    membership?: {
        membershipNumber?: string
        type?: string
        status?: string
        amount?: number
        validity?: {
            startDate?: string
            expiryDate?: string
        }
    } | null
    user: {
        firstName: string
        lastName: string
        role: string
        status: string
        address: {
            line1?: string
            line2?: string
            cityOrVillage?: string
            district?: string
            state?: string
            pincode?: string
        }
        referredBy: {
            firstName: string
            lastName: string
        } | null
    }
}

// Custom hook to fetch dashboard data
export function useDashboardData() {
    const user = useSelector((state: RootState) => state.auth.user)
    const state = user?.address?.state || 'Unknown'
    const district = user?.address?.district || 'Unknown'

    return useQuery({
        queryKey: ['dashboard', state, district],
        queryFn: async () => {
            const response = await getData('/user-dashboard/stats');
            const typedResponse = asApiResponse<DashboardData>(response);
            const data = typedResponse.data;
            
            // Add default cases object if it doesn't exist
            if (!data.cases) {
                data.cases = {
                    totalCases: 0,
                    pendingCases: 0
                };
            }
            
            return data;
        },
        // Refetch data every 5 minutes
        refetchInterval: 5 * 60 * 1000,
        // Keep data in cache for 10 minutes
        staleTime: 10 * 60 * 1000,
        // Retry failed requests 3 times
        retry: 3,
        // Don't refetch on window focus
        refetchOnWindowFocus: false,
        // Provide fallback data for initial render
        initialData: {
            totalMembersIndia: 0,
            totalMembersState: 0,
            cases: {
                totalCases: 0,
                pendingCases: 0
            },
            referrals: {
                totalReferrals: 0,
                successfulReferrals: 0,
                pendingReferrals: 0,
                referralEarnings: 0,
                referralCode: null,
                referralLink: null
            },
            wallet: {
                balance: 0,
                totalContributions: 0,
                recentTransactions: []
            },
            totalProfessionalsState: 0,
            membership: null,
            user: {
                firstName: '',
                lastName: '',
                role: '',
                status: '',
                address: {},
                referredBy: null
            }
        } as DashboardData
    })
} 