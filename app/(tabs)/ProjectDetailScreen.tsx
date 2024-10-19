import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation'; // Importe a lista de parâmetros

type ProjectDetailScreenRouteProp = RouteProp<RootStackParamList, 'projectDetail'>;

type Props = {
  route: ProjectDetailScreenRouteProp; // Tipo da rota
};

const ProjectDetailScreen: React.FC<Props> = ({ route }) => {
  const { project } = route.params; // Acessando os parâmetros da rota

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{project.name}</Text>
      {/* Exiba outras informações do projeto aqui */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ProjectDetailScreen;
