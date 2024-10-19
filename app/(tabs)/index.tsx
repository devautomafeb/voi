import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { ButtonAdd } from '../components/ButtonAdd';
import { FormGoal } from '../components/FormGoal';
import { Card } from '../components/Card';
import { ListEmpty } from '../components/ListEmpty';
import { GoalContext } from '../hooks/goals';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { goals, delGoals, checkGoals } = useContext(GoalContext);
  const [isSimplified, setIsSimplified] = useState(false);

  const toggleViewForAll = () => {
    setIsSimplified(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Projetos</Text>
        <TouchableOpacity onPress={toggleViewForAll}>
          <MaterialIcons 
            name={isSimplified ? "expand-more" : "expand-less"} 
            size={24} 
            color="#007bff" 
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={goals}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            project={item.project}
            importance={item.importance}
            startDate={item.startDate}
            endDate={item.endDate}
            completed={item.completed}
            onDelete={() => delGoals(item)}
            onComplete={() => checkGoals(item)}
            isSimplified={isSimplified} // Passar o estado para o card
          />
        )}
        ListEmptyComponent={<ListEmpty message='Cadastre seu primeiro projeto.' />}
        contentContainerStyle={{ paddingRight: 10, paddingLeft: 10 }}
        style={{ flex: 1, alignSelf: 'stretch' }}
      />
      <ButtonAdd onPress={() => setModalVisible(true)} text={'Adicionar Projeto'} />
      <FormGoal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2, // Para adicionar sombra ao cabeçalho
    borderRadius: 10,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Barlow-Condensed',
  },
});
