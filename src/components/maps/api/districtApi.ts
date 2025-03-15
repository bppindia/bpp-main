import { getData } from '@/api/apiClient'; 

interface DistrictData {
  district: string;
  totalMembers: number;
  totalPopulation: number;
  registeredVoters: number;
  activeVolunteers: number;
}

export const fetchDistrictData = async (state: string, district: string): Promise<DistrictData> => {
  try {
    const normalizedState = state.toLowerCase().replace(/\s+/g, '_');
    const response = await getData(`/api/district/${normalizedState}/${district.toLowerCase()}`);
    return response;
  } catch (error) {
    console.error(`Failed to fetch data for ${district}, ${state}:`, error);
    throw error;
  }
};