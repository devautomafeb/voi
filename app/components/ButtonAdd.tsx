import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export function ButtonAdd( props:any ){
    return(
        <TouchableOpacity onPress={ props.onPress }
        style = {{backgroundColor : '#030303', borderRadius: 8, position: 'absolute', bottom: 30, right: 20}}>
            <Ionicons name = 'add' size = {48} color = {'#fefe'}/>
        </TouchableOpacity>
    )
}