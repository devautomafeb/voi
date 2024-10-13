import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Goal } from '../reducers/goalTypes';

interface CardProps extends Goal {
  onDelete: () => void;
  onComplete: () => void;
}

export function Card({ project, importance, startDate, endDate, completed, onDelete, onComplete }: CardProps) {
  const [modalVisible, setModalVisible] = useState(false);

  // Verificar se startDate e endDate são válidos
  const isStartDateValid = startDate instanceof Date && !isNaN(startDate.getTime());
  const isEndDateValid = endDate instanceof Date && !isNaN(endDate.getTime());

  const formattedStartDate = isStartDateValid ? startDate.toLocaleDateString() : 'Data inválida';
  const formattedEndDate = isEndDateValid ? endDate.toLocaleDateString() : 'Data inválida';

  function diffDates(startDate: Date, endDate: Date) {
    if (isStartDateValid && isEndDateValid) {
      // Calcular a diferença em milissegundos
      const timeDiff = endDate.getTime() - startDate.getTime();
      // Converter a diferença de milissegundos para dias
      return Math.round(timeDiff / (1000 * 60 * 60 * 24));
    }
    return null; // Retorna null se as datas forem inválidas
  }

  const remainingDays = diffDates(startDate, endDate);

  return (
    <View style={styles.card}>
      <Text style={styles.name}>Nome: {project.name}</Text>
      <Text style={styles.project}>Projeto: {project.description}</Text>
      <Text style={styles.importance}>Prioridade: {importance}</Text>
      <Text style={styles.completed}>
        Situação: {completed ? 'Projeto finalizado.' : 'Projeto não completado.'}
      </Text>
      <View style={styles.separator} />
      <Text style={styles.dates}>
        Duração: {formattedStartDate} até {formattedEndDate}
      </Text>

      <Text style={styles.dates}>
        {remainingDays === null
          ? 'Data inválida para calcular os dias restantes.'
          : remainingDays === 0
          ? 'O prazo está terminado.'
          : remainingDays < 1
          ? 'O prazo se encerra em menos de 24 horas.'
          : `${remainingDays === 1 ? 'Resta apenas' : 'Restam'} ${remainingDays} ${remainingDays === 1 ? 'dia para encerrar o prazo.' : 'dias para encerrar o prazo.'}`}
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
              <MaterialIcons name={completed ? 'check-circle' : 'check-circle-outline'} size={24} color="black" />
              <Text style={styles.optionText}> Projeto concluído.</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity onPress={onDelete} style={styles.modalSettings}>
              <MaterialIcons name="delete" size={24} color="black" />
              <Text style={styles.optionText}> Excluir projeto.</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalSettings}>
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
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    minWidth: '85%',
  },
  name: {
    fontSize: 20,
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
  importance: {
    fontSize: 14,
    color: '#444',
    marginVertical: 5,
    fontFamily: 'Roboto-Mono',
  },
  completed: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
    fontFamily: 'Roboto-Mono',
  },
  dates: {
    fontSize: 14,
    color: '#666',
    paddingTop: 5,
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
    alignItems: 'baseline',
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
