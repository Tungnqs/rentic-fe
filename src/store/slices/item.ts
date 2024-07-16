import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IItemState {
  selected: boolean;
}

const name = "itemState";
const initialState: IItemState = {
  selected: false,
};

const itemState = createSlice({
  name,
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<boolean>) => {
      state.selected = action.payload;
    },
  },
});

export const { selectItem } = itemState.actions;
export default itemState;
