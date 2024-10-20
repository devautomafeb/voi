import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Goal } from '../reducers/goalTypes';
import { useTheme } from '../hooks/themeContext';

interface CardProps extends Goal {
  onDelete: () => void;
  onComplete: () => void;
  isSimplified: boolean;
}

export function Card({ project, importance, startDate, endDate, completed, onDelete, onComplete, isSimplified }: CardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [fullscreenModalVisible, setFullscreenModalVisible] = useState(false);
  const { COLORS } = useTheme();

  const formattedStartDate = new Date(startDate).toLocaleDateString();
  const formattedEndDate = new Date(endDate).toLocaleDateString();

  function diffDates(startDate: string | Date, endDate: string | Date) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const timeDiff = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) 
                     - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());

    const diffDays = timeDiff / (1000 * 60 * 60 * 24);

    return Math.round(diffDays);
  }

  const remainingDays = diffDates(startDate, endDate);

  const closeModal = () => {
    setModalVisible(false);
    setFullscreenModalVisible(false);
  };

  return (
    <View 
      style={[
        styles.card, 
        { 
          backgroundColor: isSimplified && completed ? COLORS.GREEN : COLORS.CARD_BACKGROUND, 
          shadowColor: COLORS.SHADOW_COLOR 
        }
      ]}
    >
      <TouchableOpacity onPress={() => { setModalVisible(false); setFullscreenModalVisible(true); }} style={styles.modalSettings}>
        
      {isSimplified ? (
        <View>
          <Text style={[styles.name, { color: COLORS.TEXT_PRIMARY }]}>Projeto: {project.name}</Text>

          {completed &&(
            <>
            <View style={[styles.separator, { backgroundColor: COLORS.SEPARATOR }]} />
              <Text style={[styles.dates, { color: COLORS.TEXT_SECONDARY }]}>Projeto concluído</Text>
              </>
            )}
          {!completed && (
            <>
              <View style={[styles.separator, { backgroundColor: COLORS.SEPARATOR }]} />
              <Text style={[styles.dates, { color: COLORS.TEXT_SECONDARY }]}>
                {remainingDays > 0
                  ? `Restam ${remainingDays} dias para finalizar.`
                  : 'O prazo está terminado.'}
              </Text>
            </>
          )}
        </View>
      ) : (
        <View>
          <View style={styles.textWithIcon}>
            <Text style={[styles.name, { color: COLORS.TEXT_PRIMARY }]}> {project.name}</Text>
          </View>

          <View style={styles.textWithIcon}>
            <MaterialIcons name="fiber-manual-record" size={10} color={COLORS.ICON_COLOR} />
            <Text style={[styles.project, { color: COLORS.TEXT_SECONDARY }]}>Descrição: {project.description}</Text>
          </View>

          <View style={styles.textWithIcon}>
            <MaterialIcons name="fiber-manual-record" size={10} color={COLORS.ICON_COLOR} />
            <Text style={[styles.importance, { color: COLORS.TEXT_SECONDARY }]}>Prioridade: {importance}</Text>
          </View>

          <View style={styles.textWithIcon}>
            <MaterialIcons name={completed ? "check-circle" : "cancel"} size={20} color={completed ? COLORS.GREEN : COLORS.RED} />
            <Text style={[styles.completed, { color: COLORS.TEXT_SECONDARY }]}>
              Situação: {completed ? 'Projeto finalizado.' : 'Projeto não completado.'}
            </Text>
          </View>

          <View style={[styles.separator, { backgroundColor: COLORS.SEPARATOR }]} />

          <View style={styles.textWithIcon}>
            <MaterialIcons name="date-range" size={20} color={COLORS.ICON_COLOR} />
            <Text style={[styles.dates, { color: COLORS.TEXT_SECONDARY }]}>
              Duração: de {formattedStartDate} até {formattedEndDate}
            </Text>
          </View>

          <Text style={[styles.dates, { color: COLORS.TEXT_SECONDARY }]}>
            {remainingDays === 0
              ? 'O prazo está terminado.'
              : remainingDays < 1 && remainingDays > 0
              ? 'O prazo se encerra em menos de 24 horas.'
              : `${remainingDays === 1 ? 'Resta apenas' : 'Restam'} ${remainingDays} ${
                  remainingDays === 1 ? 'dia para encerrar o prazo' : 'dias para encerrar o prazo'
                }.`}
          </Text>
        </View>
      )}

      <TouchableOpacity 
        style={styles.moreIcon} 
        onPress={() => setModalVisible(true)}
        accessibilityLabel="Mais opções"
        accessibilityRole="button"
      >
        <MaterialIcons name="more-vert" size={24} color={COLORS.ICON_COLOR} />
      </TouchableOpacity>

      {/* Modal de tela cheia */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={fullscreenModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.fullscreenModalContainer}>
  {/* Header com título e botão de fechar */}
  <View style={[styles.modalHeader, { backgroundColor: COLORS.GRAY_LIGHT}]}>
    <Text style={[styles.headerTitle, { color: COLORS.TEXT_PRIMARY }]}>Detalhes do Projeto</Text>
    <TouchableOpacity onPress={closeModal} style={styles.headerCloseButton}>
      <MaterialIcons name="close" size={28} color={COLORS.RED} />
    </TouchableOpacity>
  </View>

  {/* Conteúdo do modal */}
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY }]}>Nome: {project.name}</Text>
    <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY }]}>Descrição: {project.description}</Text>
    <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY }]}>Prioridade: {importance}</Text>
    <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY }]}>Situação: {completed ? 'Finalizado' : 'Não finalizado'}</Text>
    <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY }]}>Duração: de {formattedStartDate} até {formattedEndDate}</Text>
    <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY }]}>Restam {remainingDays} dias.</Text>
    
    {/* Botão de fechar na parte inferior */}
    <TouchableOpacity onPress={closeModal} style={[styles.closeButton, { backgroundColor: COLORS.RED }]}>
      <Text style={[styles.closeButtonText, { color: COLORS.TEXT_LIGHT }]}>Fechar</Text>
    </TouchableOpacity>
  </ScrollView>
</View>

      </Modal>
      
      {/* Modal de opções */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalView, { backgroundColor: COLORS.WHITE_BACKGROUND }]}>
            <TouchableOpacity onPress={onComplete} style={styles.modalSettings}>
              <MaterialIcons 
                name={completed ? "check-circle" : "check-circle-outline"} 
                size={24} 
                color={COLORS.GREEN} 
              />
              <Text style={[styles.optionText, { color: COLORS.TEXT_PRIMARY }]}>
              {completed ? 'Finalizado.' : 'Não finalizado.'}
              </Text>
            </TouchableOpacity>
            <View style={[styles.separator, { backgroundColor: COLORS.SEPARATOR }]} />
            <TouchableOpacity onPress={onDelete} style={styles.modalSettings}>
              <MaterialIcons name="delete" size={24} color={COLORS.RED} />
              <Text style={[styles.optionText, { color: COLORS.TEXT_PRIMARY }]}> Excluir projeto.</Text>
            </TouchableOpacity>
            <View style={[styles.separator, { backgroundColor: COLORS.SEPARATOR }]} />
            <TouchableOpacity onPress={() => { setModalVisible(false); setFullscreenModalVisible(true); }} style={styles.modalSettings}>
              <MaterialIcons name="info" size={24} color={COLORS.ICON_COLOR} />
              <Text style={[styles.optionText, { color: COLORS.TEXT_PRIMARY }]}> Ver detalhes.</Text>
            </TouchableOpacity>
            <View style={[styles.separator, { backgroundColor: COLORS.SEPARATOR }]} />
            <TouchableOpacity onPress={closeModal} style={styles.modalSettings}>
              <MaterialIcons name="close" size={24} color={COLORS.TEXT_PRIMARY} />
              <Text style={[styles.optionText, { color: COLORS.TEXT_PRIMARY }]}> Fechar.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 5,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 14,
  },
  moreIcon: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  optionText: {
    fontSize: 18,
  },
  modalSettings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 10,
    height: 1,
  },
  fullscreenModalContainer: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    alignSelf: 'center',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 18,
  },
  textWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  project: {
    fontSize: 16,
    marginLeft: 5,
    marginBottom:5
  },
  importance: {
    fontSize: 16,
    marginLeft: 5,
    marginBottom:5
  },
  completed: {
    fontSize: 16,
    marginLeft: 5,
    marginBottom:5
  },
  modalHeader: {
    padding: 10,
    marginTop:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerCloseButton: {
    padding: 5,
  },
});
