import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse, Ilogin, Iprofile } from "../../types/type";
import { API } from "../../lib/api";
import { AxiosError } from "axios";

export const loginAsync = createAsyncThunk<
  string,
  Ilogin,
  { rejectValue: string }
>("authLogin", async (props, { rejectWithValue }) => {
  try {
    const { data } = await API.post("/user/login", props);
    console.log(data);
    const token = data.token;
    localStorage.setItem("token", token);
    alert(`login success`)
    return token;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>
    console.log(err.response?.data?.message)
    alert(err.response?.data?.message)
    return rejectWithValue("error");
  }
});

export const getProfileAsync = createAsyncThunk<
  Iprofile,
  void,
  { rejectValue: string }
>("authProfile", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const bearer = token ? `Bearer ${token}` : ""
    const { data } = await API.get("/user/userLogin", {
      headers: {
        Authorization: bearer,
      },
    });

    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue("error");
  }
});

export const logoutAsync = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("authLogout", (_, { rejectWithValue }) => {
  try {
    localStorage.clear();
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>
    console.log(err.response?.data?.message)
    alert(err.response?.data?.message)
    return rejectWithValue("error");
  }
});
