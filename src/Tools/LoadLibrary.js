import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';


export function loadFont() {

    AntDesign.loadFont()
    Entypo.loadFont()
    EvilIcons.loadFont()
    Feather.loadFont()
    FontAwesome.loadFont()
    // FontAwesome5.loadFont()
    Foundation.loadFont()
    Ionicons.loadFont()
    Fontisto.loadFont()
    MaterialCommunityIcons.loadFont()
    MaterialIcons.loadFont()
    Octicons.loadFont()
    Zocial.loadFont()

}




export function selectIcon(initial) {
    loadFont()

    switch (initial) {
        case 'FontAwesome':
            return FontAwesome
        case 'EvilIcons':
            return EvilIcons
        case 'AntDesign':
            return AntDesign
        case 'Entypo':
            return Entypo
        case 'Feather':
            return Feather
        case 'FontAwesome5':
            return FontAwesome5

        case 'Foundation':
            return Foundation
        case 'Ionicons':
            return Ionicons
        case 'Fontisto':
            return Fontisto
        case 'MaterialCommunityIcons':
            return MaterialCommunityIcons
        case 'MaterialIcons':
            return MaterialIcons
        case 'Octicons':
            return Octicons
        case 'Zocial':
            return Zocial

    }

    return initial

}
