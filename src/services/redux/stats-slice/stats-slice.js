import { createSlice } from "@reduxjs/toolkit";

const offersNames = [
  'Offer-1',
  'Offer-2',
  'Offer-3',
  'Offer-4',
  'Offer-5'
];

const initialState = {
  dates: {},
  datePeriod: "today",
  offersTotalCheck: true,
  sortType: "days",
  selectedOffers: offersNames,
  subs: {},
  visibleColumns: ["Дата", "Сумма"],
  stickyColumn: "none",
  data: null
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    changeDates: (state, {payload}) => {
      state.dates = payload;
    },
    applySettings: (state, {payload}) => {
      state.sortType = payload.sortType;
      state.datePeriod = payload.datePeriod;
      state.selectedOffers = payload.selectedOffers;
      state.offersTotalCheck = payload.offersTotalCheck;
      state.visibleColumns = payload.visibleColumns;
      state.subs = payload.subsValue;
      state.stickyColumn = payload.stickyColumn
    }
  }
})

export const dates = (state) => state.stats.dates;
export const datePeriod = (state) => state.stats.datePeriod;
export const offersTotalCheck = (state) => state.stats.offersTotalCheck;
export const sortType = (state) => state.stats.sortType;
export const selectedOffers = (state) => state.stats.selectedOffers;
export const subs = (state) => state.stats.subs;
export const visibleColumns = (state) => state.stats.visibleColumns;
export const stickyColumn = (state) => state.stats.stickyColumn;
export const data = (state) => state.stats.data;
export const { changeDates, applySettings } = statsSlice.actions
export default statsSlice.reducer