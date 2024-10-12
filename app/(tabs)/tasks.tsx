import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet, StatusBar } from 'react-native';
import { ButtonAdd } from '../components/ButtonAdd';
import { CardTask } from '../components/CardTask';
import { ListEmpty } from '../components/ListEmpty';
import { TaskContext } from '../hooks/tasksHook';
import { FormTask } from '../components/FormTask';

export default function Tasks() {
  const [modalVisible, setModalVisible] = useState(false);
  const { tasks, delTask, checkTask } = useContext(TaskContext);
  

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CardTask
            id={item.id}
            task={item.task}
            onDelete={() => delTask(item)}
            onComplete={() => checkTask(item)} />
        )}
        ListEmptyComponent={<ListEmpty message='Cadastre sua primeira tarefa' />}
        contentContainerStyle={{ paddingRight: 10, paddingLeft:10 }}
        style={{ flex: 1, alignSelf: 'stretch' }}
      />
      <ButtonAdd onPress={() => setModalVisible(true)} text={'Adicionar Tarefa'} />
      <FormTask visible={modalVisible} onClose={() => setModalVisible(false)} />
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
    fontFamily: 'Roboto-Mono',
  },
});
