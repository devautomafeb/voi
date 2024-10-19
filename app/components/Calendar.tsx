import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importa a localidade em português
import { useTheme } from '../hooks/themeContext'; // Importa o hook useTheme

dayjs.locale('pt-br'); // Define o dayjs para usar a localidade em português

interface CalendarProps {
  onChange: (date: Date) => void;
  mode: 'date' | 'time' | 'datetime';
  isVisible: boolean;
  onClose: () => void;
}

export const Calendar: React.FC<CalendarProps> = ({ onChange, mode, isVisible, onClose }) => {
  const theme = useTheme(); // Usa o hook useTheme para obter as cores do tema

  const handleConfirm = (date: Date) => {
    onChange(date);
    onClose();
  };

  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode={mode}
      onConfirm={handleConfirm}
      onCancel={onClose}
      locale="pt_BR"
      confirmTextIOS="Confirmar"
      cancelTextIOS="Cancelar"
      textColor={theme.COLORS.PRIMARY} // Usa a cor primária do tema
      buttonTextColorIOS={theme.COLORS.PRIMARY} // Usa a cor secundária do tema
    />
  );
};
