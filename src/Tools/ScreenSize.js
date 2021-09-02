import { Dimensions } from 'react-native';



export function getWidth() {
    return Dimensions.get('window').width;
}

export function getHeight() {
    return Dimensions.get('window').height;
}