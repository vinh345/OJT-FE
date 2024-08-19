import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { GET } from "../constants/httpMethod";

export const getOutStandingJobs = createAsyncThunk("permitAll/getOutStandingJobs", async (thunkAPI) => {
    try{
        const response = await BASE_URL[GET](
            "/permitall/outstandingjob"
        );
        return response.data;
    }
    catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data || e.message);
      }
}
)

export const getOutStandingCompany = createAsyncThunk("permitAll/getOutStandingCompany", async (thunkAPI) => {
    try{
        const response = await BASE_URL[GET](
            "/permitall/outstandingcompany"
        );
        return response.data;
    }
    catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data || e.message);
      }
}
)

export const getOutStandingCandidate = createAsyncThunk("permitAll/getOutStandingCandidate", async (thunkAPI) => {
    try{
        const response = await BASE_URL[GET](
            "/permitall/outstandingcandidate"
        );
        return response.data;
    }
    catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data || e.message);
      }
}
)

export const getStat = createAsyncThunk("permitAll/getStat", async (thunkAPI) => {
    try{
        const response = await BASE_URL[GET](
            "/permitall/stat"
        );
        return response.data;
    }
    catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data || e.message);
      }
}
)


export const getCandidate = createAsyncThunk("permiAll/getCandidate",async ({page,search},thunkAPI) => {
    try{
        const response = await BASE_URL[GET](
            `/permitall/candidate?page=${page}&search=${search}`
        );
        return response.data;
    }
    catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data || e.message);
      }
})


