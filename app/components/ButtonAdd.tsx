import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useTheme } from '../hooks/themeContext'; // Importando o useTheme

export function ButtonAdd(props: any) {
    const theme = useTheme(); // Usando o hook useTheme

    return (
        <View style={styles.separator}>
            <TouchableOpacity 
                style={[styles.button, { backgroundColor: '#333', marginTop: 10 }]} 
                onPress={props.onPress}
            >
                <Text style={styles.buttonText}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    separator: {
        width: '100%',
        borderTopColor: '#ccc',
        borderTopWidth: 1
    },
    button: {
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
        fontFamily: 'Barlow-Condensed',
    },
});
