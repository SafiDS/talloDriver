import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TouchableOpacity, Image } from 'react-native'
import { Icon } from 'react-native-vector-icons'
import { Input } from 'react-native-elements';


const MapInput = (props) => {
  return (
    <>
      <GooglePlacesAutocomplete
        placeholder='Enter Pickup Location'
     
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
         console.log(data, details);
        // props.notifyFromChange(details.geometry.location);
        }
        }
        query={{
          key: 'AIzaSyB79IrJjGiy5oFOtgfTltYJk5rUVdp63vA',
          language: 'en'
        }}
        currentLocation={true}
        currentLocationLabel='Current location'
        textInputProps={{
          InputComp: Input,
          leftIcon: { type: 'font-awesome', name: 'chevron-left' },
          errorStyle: { color: 'red' },
        }}
      />

      <GooglePlacesAutocomplete
        placeholder='Enter Drop Location'
        minLength={2} // minimum length of text to search
        autoFocus={true}
        returnKeyType={'search'} // Can be left out for default return key 
        listViewDisplayed={false}    // true/false/undefined
        fetchDetails={true}
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          props.notifyToChange(details.geometry.location);
        }
        }
        textInputProps={{
          InputComp: Input,
          leftIcon: { type: 'font-awesome', name: 'chevron-left' },
          errorStyle: { color: 'red' },
          


        }}
        query={{
          key: 'AIzaSyB79IrJjGiy5oFOtgfTltYJk5rUVdp63vA',
          language: 'en'
        }}

        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={300}
      />
    </>
  );
}
export default MapInput;