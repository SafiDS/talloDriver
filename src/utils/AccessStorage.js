import AsyncStorage from '@react-native-community/async-storage';

export const saveToStorage = async (field, value) => {
  try {
    await AsyncStorage.setItem(field, value ? value : '');
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

export const removeFromStorage = async (field) => {
  try {
    await AsyncStorage.removeItem(field)
  } catch (error) {
    console.log(error.message);
  }
}

export const getItemFromStorage = (field) => AsyncStorage.getItem(field).then(value => value)