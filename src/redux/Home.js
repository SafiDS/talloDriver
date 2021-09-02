

export const ROOMS = 'ROOMS'
export const selectedRoom = 'SET_SELECTED_ROOM'




const initialState = []

const cartItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ROOMS:
            return {
                ...state,
                RoomList: action.payload
            }
        case selectedRoom:
            return {
                ...state,
                SelectRoom: action.payload
            }

    }
    return state
}

export default cartItemsReducer