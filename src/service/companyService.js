import BASE_URL from "../api";
import { accessToken } from "../constants/accessToken";
import { GET } from "../constants/httpMethod";

export const fetchProfile = async (id) => {
    try {
        
        const response = await BASE_URL[GET](`company/viewCandidateInfo/${id}`,
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
        );
        
        return response.data;
    } catch (error) {
        console.error("Error fetching profile data", error);
        return null;
    }
};

