import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Stop } from '../reducers/stopTypes';
import { useTheme } from '../hooks/themeContext'; 

interface CardTaskStopProps extends Stop {
  onDelete: () => void;
}

export function CardStop({ stop, onDelete }: CardTaskStopProps) {
  const { COLORS } = useTheme(); // Acessando as cores do tema
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.card, { backgroundColor: COLORS.RED_LIGHT, shadowColor: COLORS.SHADOW_COLOR }]}>
      <Text style={[styles.name, { color: COLORS.TEXT_PRIMARY }]}>Não devo: {stop.name}</Text>
      <Text style={[styles.project, { color: COLORS.TEXT_SECONDARY }]}>Pois isto implica: {stop.description}</Text>

      <TouchableOpacity style={styles.moreIcon} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="more-vert" size={24} color={COLORS.ICON_COLOR} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalView, { backgroundColor: COLORS.WHITE_BACKGROUND }]}>
            <TouchableOpacity onPress={onDelete} style={styles.modalSettings}>
              <MaterialIcons name="delete" size={24} color={COLORS.ICON_COLOR} />
              <Text style={[styles.optionText, { color: COLORS.TEXT_PRIMARY }]}>Excluir proibição.</Text>
            </TouchableOpacity>
            <View style={[styles.separator, { backgroundColor: COLORS.SEPARATOR }]} />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalSettings}>
              <MaterialIcons name="close" size={24} color={COLORS.ICON_COLOR} />
              <Text style={[styles.optionText, { color: COLORS.TEXT_PRIMARY }]}>Fechar.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    minWidth: '85%',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Roboto-Mono',
  },
  project: {
    fontSize: 16,
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
    borderRadius: 10,
    alignItems: 'baseline',
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
    width: '100%',
    marginVertical: 10,
  },
});

export default CardStop;
