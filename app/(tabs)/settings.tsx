import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/themeContext'; // Hook para o tema

export default function Settings() {
  const theme = useTheme(); // Hook para acessar o tema atual

  const texts = [
    '14 Os sábios acumulam conhecimento, mas a boca do insensato é um convite à ruína.A riqueza dos ricos é a sua cidade fortificada,mas a pobreza é a ruína dos pobres.',
    'Texto 2: A história por trás...',
    'Texto 3: Os objetivos principais...',
    'Texto 4: As implementações...',
    'Texto 5: O futuro da aplicação...'
  ];

  return (
    <View style={styles(theme).container}>
      {/* Seção 'Sobre' */}
      <View style={styles(theme).section}>
        <Text style={styles(theme).sectionHeader}>Sobre</Text>
        <Text style={styles(theme).aboutText}>
          Esta aplicação foi desenvolvida para gerenciar metas, tarefas e ideias de forma eficiente, 
          integrando persistência de dados e personalização de temas.
        </Text>
      </View>

      {/* Seção de Textos */}
      <View style={styles(theme).section}>
        <Text style={styles(theme).sectionHeader}>Textos para Leitura</Text>
        {texts.map((text, index) => (
          <TouchableOpacity key={index} style={styles(theme).textButton}>
            <Text style={styles(theme).text}>{text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// Função que cria estilos dinâmicos com base no tema
const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.COLORS.BACKGROUND,
    },
    section: {
      marginBottom: 30,
    },
    sectionHeader: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.COLORS.PRIMARY,
      marginBottom: 10,
      fontFamily: 'Barlow-Condensed',
    },
    aboutText: {
      fontSize: 16,
      color: theme.COLORS.TEXT,
      lineHeight: 24,
      fontFamily: 'Barlow-Condensed',
    },
    textButton: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.COLORS.BORDER,
    },
    text: {
      fontSize: 16,
      color: theme.COLORS.TEXT,
      fontFamily: 'Barlow-Condensed',
    },
  });
