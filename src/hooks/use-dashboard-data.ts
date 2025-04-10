import { useState, useEffect } from 'react'
import { RootState } from '@/store/store'
import { asApiResponse } from '@/types/api'
import { useSelector } from 'react-redux'
import { getData } from '@/api/apiClient'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

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

// Default data for initial render
const defaultData: DashboardData = {
  totalMembersIndia: 0,
  totalMembersState: 0,
  cases: {
    totalCases: 0,
    pendingCases: 0,
  },
  referrals: {
    totalReferrals: 0,
    successfulReferrals: 0,
    pendingReferrals: 0,
    referralEarnings: 0,
    referralCode: null,
    referralLink: null,
  },
  wallet: {
    balance: 0,
    totalContributions: 0,
    recentTransactions: [],
  },
  totalProfessionalsState: 0,
  membership: null,
  user: {
    firstName: '',
    lastName: '',
    role: '',
    status: '',
    address: {},
    referredBy: null,
  },
}

// Custom hook to fetch dashboard data
export function useDashboardData() {
  const user = useSelector((state: RootState) => state.auth.user)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const navigate = useNavigate()
  
  const state = user?.address?.state || 'Unknown'
  const district = user?.address?.district || 'Unknown'
  
  const [data, setData] = useState<DashboardData>(defaultData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      // If user is not authenticated, redirect to login
      if (!isAuthenticated) {
        setIsLoading(false)
        setError(new Error('Not authenticated'))
        navigate({ to: '/sign-in' })
        return
      }
      
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await getData('/user-dashboard/stats')
        const typedResponse = asApiResponse<DashboardData>(response)
        let dashboardData = typedResponse.data

        // Add default cases object if it doesn't exist
        if (!dashboardData.cases) {
          dashboardData = {
            ...dashboardData,
            cases: {
              totalCases: 0,
              pendingCases: 0,
            }
          }
        }

        setData(dashboardData)
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to load dashboard data')
        setError(error)
        toast.error('Failed to load dashboard data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    
    // Set up interval to refresh data every 5 minutes
    const intervalId = setInterval(fetchData, 5 * 60 * 1000)
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId)
  }, [state, district, isAuthenticated, navigate])

  return { data, isLoading, error }
}
