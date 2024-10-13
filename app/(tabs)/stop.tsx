import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet, StatusBar } from 'react-native';
import { ButtonAdd } from '../components/ButtonAdd';
import { ListEmpty } from '../components/ListEmpty';
import { FormStop } from '../components/FormStop';
import { StopContext } from '../hooks/stopHook';
import {CardStop} from '../components/CardStop';

export default function Stop() {
  const [modalVisible, setModalVisible] = useState(false);
  const { stops, delStop } = useContext(StopContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={stops}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CardStop
            id={item.id}
            stop={item.stop}
            onDelete={() => delStop(item)}
           />
        )}
        ListEmptyComponent={<ListEmpty message='Cadastre seu primeiro Não' />}
        contentContainerStyle={{ paddingRight: 10, paddingLeft:10 }}
        style={{ flex: 1, alignSelf: 'stretch' }}
      />
      <ButtonAdd onPress={() => setModalVisible(true)} text={'Adicionar'} />
      <FormStop visible={modalVisible} onClose={() => setModalVisible(false)} />
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
