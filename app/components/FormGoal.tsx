import React, { useContext, useState } from 'react';
import { Modal, View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Calendar } from './Calendar';
import { GoalContext } from '../hooks/goals';
import { Goal, projectData } from '../reducers/goalTypes';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';

interface FormGoalProps {   
  visible: boolean;
  onClose: () => void;
}

export const FormGoal: React.FC<FormGoalProps> = ({ visible, onClose }) => {
  const { addGoals } = useContext(GoalContext);

  const [project, setProject] = useState<projectData>({ name: '', description: '' });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [importance, setImportance] = useState(0);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleAddGoal = () => {
    if (project.name && importance && startDate && endDate >= startDate) {

      const quality = classifyProject(importance);
      
      const goal: Goal = {
        id: Math.round(100000 * Math.random()),
        project,
        importance: quality.toString(),
        startDate,
        endDate,
      };
      addGoals(goal);
      setProject({ name: '', description: '' });
      setImportance(0);
      setStartDate(new Date());
      setEndDate(new Date());
      onClose();
    } else {
      Alert.alert((endDate < startDate) ?
        ('A data de término não pode ser posterior a data de início.') : (
          'Por favor, preencha todos os campos'
        ));
    }
  };

  const handleStartChange = (selectedDate: Date) => {
    setStartDate(selectedDate);
  };

  const handleEndChange = (selectedDate: Date) => {
    setEndDate(selectedDate);
  };

  const classifyProject = (importance: number) => {
    if (importance <= 20) {
      return 'Baixa'
    }
    if (importance > 20 && importance <= 40) {
      return 'Requer atenção'
    }
    if (importance > 40 && importance <= 60) {
      return 'Média'
    }
    if (importance > 60 && importance <= 80) {
      return 'Alta'
    }
    if (importance > 80) {
      return 'Urgente'
    }else{
      return 'Não definida'
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Novo Projeto</Text>
          <Text style={styles.label}>Nome do Projeto</Text>
          <TextInput
            placeholder="Nome do Projeto"
            style={styles.input}
            value={project.name}
            onChangeText={(text) => setProject({ ...project, name: text })}
            multiline={true}
          />
          <Text style={styles.label}>Descrição do Projeto</Text>
          <TextInput
            placeholder="Descrição do Projeto"
            style={[styles.input, { minHeight:60, maxHeight: 120 }]}
            value={project.description}
            onChangeText={(text) => setProject({ ...project, description: text })}
            multiline={true}
            numberOfLines={3}
          />

          <View style={styles.dateContainer}>
            <TouchableOpacity style={styles.datePicker} onPress={() => setShowStartPicker(true)}>
              <Text style={styles.label}>Data de Início:</Text>
              <Text style={styles.dateText}>{dayjs(startDate).format('DD/MM/YYYY')}</Text>
              <MaterialIcons name={"date-range"} size={24} color="#333" />
            </TouchableOpacity>
            <Calendar
              isVisible={showStartPicker}
              mode="date"
              onChange={handleStartChange}
              onClose={() => setShowStartPicker(false)}
            />
          </View>

          <View style={styles.dateContainer}>
            <TouchableOpacity style={styles.datePicker} onPress={() => setShowEndPicker(true)}>
              <Text style={styles.label}>Data de Fim:</Text>
              <Text style={styles.dateText}>{dayjs(endDate).format('DD/MM/YYYY')}</Text>
              <MaterialIcons name={"date-range"} size={24} color="#333" />
            </TouchableOpacity>
            <Calendar
              isVisible={showEndPicker}
              mode="date"
              onChange={handleEndChange}
              onClose={() => setShowEndPicker(false)}
            />
          </View>

          <Text style={styles.label}>Importância: {classifyProject(importance)}  {importance}% </Text>
          <Slider
            style={{ width: '100%' }}
            minimumValue={0}
            maximumValue={100}
            step={20}
            value={importance}
            onValueChange={(value) => setImportance(value)}
            thumbTintColor='#121212'
            maximumTrackTintColor='#eee'
            minimumTrackTintColor='#333'
          />
          <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={handleAddGoal}>
            <Text style={styles.buttonText}>Adicionar Projeto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: 30,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Mono',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
    fontFamily: 'Roboto-Mono',
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
    fontFamily: 'Roboto-Mono',
  },
  dateContainer: {
    width: '100%',
    marginBottom: 20,
    fontFamily: 'Roboto-Mono',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Roboto-Mono',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Roboto-Mono',
  },
  button: {
    backgroundColor: '#333333',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    fontFamily: 'Roboto-Mono',
  },
  buttonClose: {
    backgroundColor: '#f44336',
    fontFamily: 'Roboto-Mono',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto-Mono',
  },
});
