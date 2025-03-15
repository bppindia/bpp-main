// src/pages/dashboard/api/dashboardApi.ts
import { getData } from '@/api/apiClient';

export const fetchDashboardData = async () => {
  try {
    const response = await getData('/api/v1/dashboard'); // Adjust endpoint as per your backend
    return response;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    const response = await getData('/api/v1/user/profile'); // Adjust endpoint
    return response;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
};