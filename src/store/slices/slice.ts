import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Loans = {
  id: number,
  title: string,
  tranche: string,
  available: number,
  annualised_return: string,
  term_remaining: string,
  ltv: string,
  amount: string,
}

export type State = {
  loans: Loans[],
}

type payload = {
  id: number,
  avail: number
}
const initialState: State = {
  loans: [
    {
      'id': 1,
      'title': 'Voluptate et sed tempora qui quisquam.',
      'tranche': 'A',
      'available': 11959,
      'annualised_return': '8.60',
      'term_remaining': '864000',
      'ltv': '48.80',
      'amount': '85754'
    },
    {
      'id': 5,
      'title': 'Consectetur ipsam qui magnam minus dolore ut fugit.',
      'tranche': 'B',
      'available': 31405,
      'annualised_return': '7.10',
      'term_remaining': '1620000',
      'ltv': '48.80',
      'amount': '85754'
    },
    {
      'id': 12,
      'title': 'Dolores repudiandae ut voluptas unde laborum quaerat et sapiente.',
      'tranche': 'C',
      'available': 12359,
      'annualised_return': '4.80',
      'term_remaining': '879000',
      'ltv': '48.80',
      'amount': '85754'
    }
  ],
}
export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    changeAvailability: (state, action: PayloadAction<payload>) => {
      const loan = state.loans.find(item => item.id === action.payload.id);
      if (loan && loan.available - action.payload.avail >= 0) {
        loan.available -= action.payload.avail;
      }
    }
  },
})

export default slice.reducer;

export const { changeAvailability } = slice.actions;