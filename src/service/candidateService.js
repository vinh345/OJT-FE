import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { DELETE, GET, POST, PUT } from "../constants/httpMethod";
import { Cookies } from "react-cookie";
import axios from "axios";
const cookie = new Cookies();
export const getCandidateInfo = createAsyncThunk("user/info", async () => {
  try {
    const response = BASE_URL[GET]("/candidate/info", {
      headers: {
        Authorization: `Bearer ${cookie.get("accessToken")}`,
      },
    });
    return response;
  } catch (e) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const updateCandidateInfo = createAsyncThunk(
  "user/info",
  async (formEdit, thunkAPI) => {
    try {
      const response = await BASE_URL[PUT](
        "/candidate/update/account",
        formEdit,
        {
          headers: {
            "Content-Type": "Multipart/form-data",
            Authorization: "Bearer " + cookie.get("accessToken"),
          },
        }
      );
      console.log(response);

      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const addEducation = createAsyncThunk(
  "candidate/addeducation",
  async ({ nameEducation, major, startAt, endAt, info }, thunkAPI) => {
    try {
      const response = await BASE_URL[POST](
        "/candidate/education",
        { nameEducation, major, startAt, endAt, info },
        {
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"),
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const deleteEducation = createAsyncThunk(
  "candidate/deleteeducation",
  async (id, thunkAPI) => {
    try {
      const response = await BASE_URL[DELETE](`/candidate/education/${id}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      });
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const editEducation = createAsyncThunk(
  "candidate/editEducation",
  async ({id, nameEducation, major, startAt, endAt, info }, thunkAPI) => {
    try {
      const response = await BASE_URL[PUT](
        "/candidate/education",
        {id, nameEducation, major, startAt, endAt, info },
        {
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"),
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const addExperience = createAsyncThunk("candidate/addExperience", async ({position,company,startAt,endAt,info}, thunkAPI)=>{
  try{
    const response = await BASE_URL[POST](
      "/candidate/experience",
      {position, company, startAt, endAt, info},
      {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      }
    );
    return response;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
})

export const deleteExperience = createAsyncThunk(
  "candidate/deleteeexperience",
  async (id, thunkAPI) => {
    try {
      const response = await BASE_URL[DELETE](`/candidate/experience/${id}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      });
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const editExperience = createAsyncThunk(
  "candidate/editExperience",
  async ({id, company, position, startAt, endAt, info }, thunkAPI) => {
    try {
      const response = await BASE_URL[PUT](
        "/candidate/experience",
        {id, company, position, startAt, endAt, info },
        {
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"),
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const addProject = createAsyncThunk("candidate/addProject", async ({name,link,startAt,endAt,info}, thunkAPI)=>{
  try{
    const response = await BASE_URL[POST](
      "/candidate/project",
      {name, link, startAt, endAt, info},
      {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      }
    );
    return response;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
})

export const deleteProject = createAsyncThunk(
  "candidate/deleteproject",
  async (id, thunkAPI) => {
    try {
      const response = await BASE_URL[DELETE](`/candidate/project/${id}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      });
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const editProject = createAsyncThunk(
  "candidate/editProject",
  async ({id, name, link, startAt, endAt, info }, thunkAPI) => {
    try {
      const response = await BASE_URL[PUT](
        "/candidate/project",
        {id, name, link, startAt, endAt, info },
        {
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"),
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const addCertificate = createAsyncThunk(
  "candidate/addcertificate",
  async ({ name, organization, startAt, endAt, info }, thunkAPI) => {
    try {
      const response = await BASE_URL[POST](
        "/candidate/certificate",
        { name, organization, startAt, endAt, info },
        {
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"),
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const deleteCertificate = createAsyncThunk(
  "candidate/deletecertificate",
  async (id, thunkAPI) => {
    try {
      const response = await BASE_URL[DELETE](`/candidate/certificate/${id}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      });
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const editCertificate = createAsyncThunk(
  "candidate/editCertificate",
  async ({id, name, organization, startAt, endAt, info }, thunkAPI) => {
    try {
      const response = await BASE_URL[PUT](
        "/candidate/certificate",
        {id, name, organization, startAt, endAt, info },
        {
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"),
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const getLvJob = createAsyncThunk("candidate/getLvJob",async (thunkAPI)=>{
  try{
    const response = await BASE_URL[GET](
      "/candidate/getlvjob",
      {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      }
    );
    return response;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
})
export const addSkill = createAsyncThunk(
  "candidate/addskill",
  async ({ name,levelJobId }, thunkAPI) => {
    try {
      const response = await BASE_URL[POST](
        "/candidate/skill",
        { name,levelJobId },
        {
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"),
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "candidate/deleteskill",
  async (id, thunkAPI) => {
    try {
      const response = await BASE_URL[DELETE](`/candidate/skill/${id}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      });
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const updateSkill = createAsyncThunk(
  "candidate/editSkill",
  async ({id, name,levelJobId }, thunkAPI) => {
    try {
      const response = await BASE_URL[PUT](
        "/candidate/skill",
        {id, name,levelJobId },
        {
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"),
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);