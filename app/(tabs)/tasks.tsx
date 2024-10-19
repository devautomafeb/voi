import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ButtonAdd } from '../components/ButtonAdd';
import { CardTask } from '../components/CardTask';
import { ListEmpty } from '../components/ListEmpty';
import { TaskContext } from '../hooks/tasksHook';
import { FormTask } from '../components/FormTask';
import { useTheme } from '../hooks/themeContext'; // Importando o useTheme

export default function Tasks() {
  const [modalVisible, setModalVisible] = useState(false);
  const { tasks, delTask, checkTask } = useContext(TaskContext);
  const theme = useTheme(); // Usando o hook useTheme

  // Estilos criados dinamicamente com base no tema
  const styles = createStyles(theme);

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
            onComplete={() => checkTask(item)}
          />
        )}
        ListEmptyComponent={<ListEmpty message='Cadastre sua primeira tarefa' />}
        contentContainerStyle={{ paddingRight: 10, paddingLeft: 10 }}
        style={{ flex: 1, alignSelf: 'stretch' }}
      />
      <ButtonAdd onPress={() => setModalVisible(true)} text={'Adicionar Tarefa'} />
      <FormTask visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

// Função que cria os estilos dinamicamente com base no tema
const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      backgroundColor: theme.COLORS.WHITE_BACKGROUND, // Usando a cor do tema
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      fontFamily: 'Barlow-Condensed',
      color: theme.COLORS.PRIMARY, // Usando a cor do tema
    },
  });
