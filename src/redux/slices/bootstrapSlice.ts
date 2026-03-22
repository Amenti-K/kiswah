import { getBootstrapData } from "@/apis/company-info.api";
import { BootstrapData } from "@/components/interface/analytics.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBootstrapData = createAsyncThunk(
  "bootstrap/fetch",
  async () => {
    return await getBootstrapData();
  },
);

interface BootstrapState {
  data: BootstrapData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BootstrapState = {
  data: null,
  status: "idle",
  error: null,
};

const bootstrapSlice = createSlice({
  name: "bootstrap",
  initialState,
  reducers: {
    setBootstrapData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBootstrapData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBootstrapData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchBootstrapData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch bootstrap data";
      });
  },
});

export const { setBootstrapData } = bootstrapSlice.actions;

export default bootstrapSlice.reducer;
