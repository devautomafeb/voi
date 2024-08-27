import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet, StatusBar } from 'react-native';
import { ButtonAdd } from '../components/ButtonAdd';
import { ListEmpty } from '../components/ListEmpty';
import { FormIdea } from '../components/FormIdea';
import { IdeaContext } from '../hooks/ideaHook';
import { CardIdea } from '../components/CardIdea';

export default function Idea() {
  const [modalVisible, setModalVisible] = useState(false);
  const { ideas, delIdea } = useContext(IdeaContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={ideas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CardIdea
            id={item.id}
            idea={item.idea}
            onDelete={() => delIdea(item)}
          />
        )}
        ListEmptyComponent={<ListEmpty message='Cadastre sua primeira Idéia' />}
        contentContainerStyle={{ paddingRight: 10, paddingLeft:10 }}
        style={{ flex: 1, alignSelf: 'stretch' }}
      />
      <ButtonAdd onPress={() => setModalVisible(true)} text={'Adicionar Idéia'} />
      <FormIdea visible={modalVisible} onClose={() => setModalVisible(false)} />
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
