import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = 'url';

export const getOffers = createAsyncThunk('offers/getOffers', async (data) => {
  try {
    const res = await fetch(API + "offers/", {
      headers: {
        'Accept': "application/json",
        'Authorization': data,
      },
    });
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }

    return await res.json();
            
  } catch(e) {
      alert(`Что-то пошло не так. Ошибка: ${e}`)
  }
})

const initialState = {
  offersData: [],
  getOffersStatus: "idle"
}

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getOffers.pending, (state) => {
      state.getOffersStatus = 'loading';
    })
    builder.addCase(getOffers.fulfilled, (state, { payload }) => {
      state.getOffersStatus = 'succeeded';
      if (payload !== undefined) {
        state.offersData = payload;
      }
    })
    builder.addCase(getOffers.rejected, (state) => {
      state.getOffersStatus = 'failed';
    })
  }
})


export const offers = (state) => state.offers.offersData;
export const getOffersStatus = (state) => state.offers.getOffersStatus;
export default offersSlice.reducer