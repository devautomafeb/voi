import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Idea } from '../reducers/ideaTypes';

interface CardTaskIdeaProps extends Idea {
  onDelete: () => void;
}

export function CardIdea({ idea, onDelete}: CardTaskIdeaProps) {

  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={styles.card}>
     <Text style={styles.name}>Nome do Projeto: {idea.name}</Text>
     <Text style={styles.project}>Descrição: {idea.description}</Text>

      <TouchableOpacity style={styles.moreIcon} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="more-vert" size={24} color="black" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={onDelete} style={styles.modalSettings}>
              <MaterialIcons name="delete" size={24} color="black" />
              <Text style={styles.optionText}> Excluir ideia.</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity onPress={()=>setModalVisible(false)} style={styles.modalSettings}>
              <MaterialIcons name="close" size={24} color="black" />
              <Text style={styles.optionText}> Fechar.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fbfbfb',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#2f1',
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    minWidth: '85%',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 5,
    fontFamily: 'Roboto-Mono',
  },
  project: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
    fontFamily: 'Roboto-Mono',
  },
  moreIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'baseline'
  },
  modalCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Roboto-Mono',
  },
  modalSettings: {
    flexDirection: 'row',
    paddingVertical: 10,
    fontFamily: 'Roboto-Mono',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'Roboto-Mono',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 10,
  },
});

export default CardIdea;
