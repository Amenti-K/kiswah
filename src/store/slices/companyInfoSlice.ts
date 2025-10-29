import { getCompanyInfo } from "@/apis/company-info.api";
import { CompanyInfoInterface } from "@/lib/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCompanyInfo = createAsyncThunk(
  "companyInfo/fetch",
  getCompanyInfo
);

type CompanyInfoState = {
  data: CompanyInfoInterface | null;
  status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: CompanyInfoState = { data: null, status: "idle" };

const companyInfoSlice = createSlice({
  name: "companyInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCompanyInfo.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default companyInfoSlice.reducer;
