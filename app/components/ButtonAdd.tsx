import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export function ButtonAdd(props: any) {
    return (
        <View style={styles.separator}>
            <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={props.onPress}>
                <Text style={styles.buttonText}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    separator: {
        width: '100%',
        borderTopColor:'#ccc',
        borderTopWidth:1
    },
    button: {
        backgroundColor: '#333333',
        borderRadius: 20,
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonClose: {
        backgroundColor: '#f44336',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Roboto-Mono',
    },
});