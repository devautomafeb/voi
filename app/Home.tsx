import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // Certifique-se de que você tem expo-router instalado

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voi</Text>
      <Text style={styles.description}>
        Esta é uma ferramenta designada para lhe ajudar a conquistar suas metas focado na simplicidade e objetividade.
      </Text>
      <Link href={'/(tabs)'} style={styles.link}>
        1. Acessar App
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f8f8f8', // Fundo branco leve
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000', // Preto para o título
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333', // Preto suave para a descrição
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    color: '#007BFF', // Azul para o link
    textDecorationLine: 'underline',
  },
});
