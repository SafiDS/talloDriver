export const DISPLAY_TO_CART = 'ADD_TO_CART'


const initialState = []

const cartItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_TO_CART:
      return [...state, action.payload]
  }
  return state
}

export default cartItemsReducer