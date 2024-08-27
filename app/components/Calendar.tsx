import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';  // Import the Portuguese locale

dayjs.locale('pt-br');  // Set dayjs to use the Portuguese locale

interface CalendarProps {
  onChange: (date: Date) => void;
  mode: 'date' | 'time' | 'datetime';
  isVisible: boolean;
  onClose: () => void;
}

export const Calendar: React.FC<CalendarProps> = ({ onChange, mode, isVisible, onClose }) => {
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
      textColor='#000'
      buttonTextColorIOS='#444'
    />
  );
};
