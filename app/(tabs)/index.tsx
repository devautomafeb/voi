import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';
import { ButtonAdd } from '../components/ButtonAdd';
import { FormGoal } from '../components/FormGoal';
import { Card } from '../components/Card';
import { ListEmpty } from '../components/ListEmpty';
import { GoalContext } from '../hooks/goals';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { goals, delGoals, checkGoals } = useContext(GoalContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Projetos</Text>
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
            onComplete={() => checkGoals(item)} />
        )}
        ListEmptyComponent={ListEmpty}
        contentContainerStyle={{ paddingRight: 10, paddingLeft:10 }}
        style={{ flex: 1, alignSelf: 'stretch' }}

      />
      <ButtonAdd title="Add Goal" onPress={() => setModalVisible(true)} />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
