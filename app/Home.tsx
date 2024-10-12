import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Home() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/images/logo.png')} // Substitua pelo caminho correto da sua imagem
        style={styles.logo}
      />
      <Text style={styles.description}>
        Esta é uma ferramenta designada para lhe ajudar a conquistar suas metas focado na simplicidade 
        e objetividade.
      </Text>
      <Link href={'/(tabs)'} asChild>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="arrow-circle-right" size={28} color="#fff" />
          <Text style={styles.buttonText}>Acessar Voi</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Roboto-Mono',
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:50,
    backgroundColor: '#333', // Azul elegante para o botão
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Para sombra no Android
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Mono',
  },
});
