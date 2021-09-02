import { combineReducers } from 'redux';
import BookItem from './BookItem'
import CartItem from './CartItem'
import SignIn from './SignIn'
import Room from './Home'


const rootReducer = combineReducers({
    BookItem, CartItem, SignIn, Room

});



export default rootReducer