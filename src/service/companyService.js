import BASE_URL from "../api";
import { GET } from "../constants/httpMethod";

export const fetchProfile = async (id) => {
    try {
        const response = await BASE_URL[GET](`/viewCandidateInfo/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching profile data", error);
        return null;
    }
};

