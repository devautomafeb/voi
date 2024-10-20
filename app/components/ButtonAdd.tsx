import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useTheme } from '../hooks/themeContext'; // Importando o useTheme

export function ButtonAdd(props: any) {
    const theme = useTheme(); // Usando o hook useTheme

    return (
        <View style={styles.separator}>
            <TouchableOpacity 
                style={[styles.button, { backgroundColor: '#333'}]} 
                onPress={props.onPress}
            >
                <Text style={styles.buttonText}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    separator: {
        textAlign:'center',
        width:'92%',
        borderRadius:10,
        margin:5,
        marginTop:10
    },
    button: {
        borderRadius: 20,
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Barlow-Condensed',
    },
});
