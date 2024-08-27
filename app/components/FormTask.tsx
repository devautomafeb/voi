import React, { useContext, useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { TaskContext } from '../hooks/tasksHook';
import { Task, taskData } from '../reducers/taskTypes';
import { Goal } from '../reducers/goalTypes';

interface FormTaskProps {
  visible: boolean;
  onClose: () => void;
}

export const FormTask: React.FC<FormTaskProps> = ({ visible, onClose }) => {
  const { addTask } = useContext(TaskContext);

  const [task, setTask] = useState<taskData>({ description: '', date: new Date(), completed: false });
  const [relatedGoal, setRelatedGoal] = useState<Goal>();

  const handleAddTask = () => {
    if (task.description) {

      const newTask: Task = {
        id: Math.round(100000 * Math.random()),
        task,
        relatedGoal: relatedGoal
      };
      
      addTask(newTask);
      setTask({ description: '', date: new Date(), completed: false});
      onClose();
      console.log(JSON.stringify(newTask))
    } 
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Nova Tarefa</Text>
          <Text style={styles.label}>Nova Tarefa</Text>
          <TextInput
            placeholder="Tarefa..."
            style={styles.input}
            value={task.description}
            onChangeText={(text) => setTask({ ...task, description: text })}
            multiline={true}
          />
          
          <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={handleAddTask}>
            <Text style={styles.buttonText}>Adicionar Tarefa</Text>
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
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto-Mono',
  },
});
