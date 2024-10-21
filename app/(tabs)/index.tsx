import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ButtonAdd } from '../components/ButtonAdd';
import { FormGoal } from '../components/FormGoal';
import { Card } from '../components/Card';
import { ListEmpty } from '../components/ListEmpty';
import { GoalContext } from '../hooks/goals';
import { useTheme } from '../hooks/themeContext'; // Importar o hook de tema
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { goals, delGoals, checkGoals } = useContext(GoalContext);
  const [isSimplified, setIsSimplified] = useState(false);
  const [filter, setFilter] = useState<'all' | 'completed' | 'notCompleted'>('all'); // Estado para o filtro

  const { COLORS } = useTheme(); // Usar o tema

  const toggleViewForAll = () => {
    setIsSimplified(prevState => !prevState);
  };

  // Função para aplicar o filtro de exibição dos projetos
  const filterGoals = () => {
    if (filter === 'completed') {
      return goals.filter(goal => goal.completed);
    }
    if (filter === 'notCompleted') {
      return goals.filter(goal => !goal.completed);
    }
    return goals; // Se for 'all', retorna todos os projetos
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.WHITE_BACKGROUND }]}>
      <View style={[styles.header, { backgroundColor: COLORS.PRIMARY }]}>
        {/* Grupo de textos para filtros e expandir/simplificar a lista */}
        <View style={styles.textGroup}>

          {/* Texto para filtrar apenas projetos concluídos */}
          <TouchableOpacity onPress={() => setFilter('completed')} style={styles.textButton}>
            <Text style={[
              styles.filterText, 
              { color: filter === 'completed' ? COLORS.YELLOW : COLORS.SECONDARY }
            ]}>
              Concluídos
            </Text>
          </TouchableOpacity>

          {/* Texto para filtrar apenas projetos não concluídos */}
          <TouchableOpacity onPress={() => setFilter('notCompleted')} style={styles.textButton}>
            <Text style={[
              styles.filterText, 
              { color: filter === 'notCompleted' ? COLORS.YELLOW : COLORS.SECONDARY }
            ]}>
              Não Concluídos
            </Text>
          </TouchableOpacity>

          {/* Texto para mostrar todos os projetos */}
          <TouchableOpacity onPress={() => setFilter('all')} style={styles.textButton}>
            <Text style={[
              styles.filterText, 
              { color: filter === 'all' ? COLORS.YELLOW : COLORS.SECONDARY }
            ]}>
              Todos
            </Text>
          </TouchableOpacity>

          {/* Ícone para expandir ou simplificar a lista */}
          <TouchableOpacity onPress={toggleViewForAll} style={{margin:5}}>
            <MaterialIcons 
              name={isSimplified ? "expand-more" : "expand-less"} 
              size={36} 
              color={COLORS.SECONDARY} 
            />
          </TouchableOpacity>

        </View>
      </View>

      <FlatList
        data={filterGoals()} // Aplicar o filtro aos dados
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            project={item.project}
            importance={item.importance}
            startDate={item.startDate}
            endDate={item.endDate}
            completed={item.completed}
            onDelete={() => delGoals(item)}
            onComplete={() => checkGoals(item)}
            isSimplified={isSimplified} // Passar o estado para o card
          />
        )}
        ListEmptyComponent={<ListEmpty message='Cadastre seu primeiro projeto.' />}
        contentContainerStyle={{ paddingRight: 10, paddingLeft: 10 }}
        style={{ flex: 1, alignSelf: 'stretch' }}
      />
      
      <ButtonAdd onPress={() => setModalVisible(true)} text={'Adicionar Projeto'} />
      <FormGoal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 0,
    elevation: 2, // Para adicionar sombra ao cabeçalho
    marginBottom: 10,
  },
  textGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  textButton: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: '5%', // Espaçamento entre os textos
  },
  filterText: {
    fontSize: 16,
    fontFamily: 'Barlow-Condensed', // Aplicar fonte "Barlow Condensed"
    fontWeight: 'bold',
  },
});
