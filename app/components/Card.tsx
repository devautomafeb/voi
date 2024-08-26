import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Goal } from '../reducers/types';

interface CardProps extends Goal {
  onDelete: () => void;
  onComplete: () => void;
}

export function Card({ project, importance, startDate, endDate, completed, onDelete, onComplete }: CardProps) {

  const [modalVisible, setModalVisible] = useState(false);

  const formattedStartDate = new Date(startDate).toLocaleDateString();
  const formattedEndDate = new Date(endDate).toLocaleDateString();

  function diffDates(startDate: Date, endDate: Date) {
    // Calcular a diferença em milissegundos
    var timeDiff = endDate.getTime() - startDate.getTime();

    // Converter a diferença de milissegundos para dias
    var diffDays = timeDiff / (1000 * 60 * 60 * 24);

    return Math.round(diffDays);
  }

  const remainingDays = diffDates(startDate, endDate);

  return (
    <View style={styles.card}>
      <Text style={styles.name}>Nome: {project.name}</Text>
      <Text style={styles.project}>Projeto: {project.description}</Text>
      <Text style={styles.importance}>Prioridade: {importance}</Text>
      <View style={styles.separator} />
      <Text style={styles.dates}>
        Duração: {formattedStartDate} até {formattedEndDate}
      </Text>

      <Text style={styles.dates}>
        {remainingDays === 0
          ? 'O prazo está terminado.'
          : remainingDays < 1 && remainingDays > 0
            ? 'O prazo se encerra em menos de 24 horas.'
            : `${remainingDays===1?'Resta apenas':'Restam'} ${remainingDays} ${remainingDays===1?'dia para encerrar o prazo':'dias para encerrar o prazo'}.`
            }
      </Text>

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
            <TouchableOpacity onPress={onComplete} style={styles.modalSettings}>
              <MaterialIcons name={completed ? "check-circle" : "check-circle-outline"} size={24} color="black" />
              <Text style={styles.optionText}> Projeto concluído.</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity onPress={onDelete} style={styles.modalSettings}>
              <MaterialIcons name="delete" size={24} color="black" />
              <Text style={styles.optionText}> Excluir projeto.</Text>
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
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    minWidth: '90%',
    width: '100%',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 5,
  },
  project: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  importance: {
    fontSize: 16,
    color: '#444',
    marginVertical: 5,
  },
  dates: {
    fontSize: 14,
    color: '#666',
    paddingTop:5
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
  },
  modalSettings: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 10,
  },
});

export default Card;
