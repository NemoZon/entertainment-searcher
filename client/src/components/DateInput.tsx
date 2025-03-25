import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type DateInputProps = {
  placeholder: string;
  dateState: [
    Date | undefined,
    React.Dispatch<React.SetStateAction<Date | undefined>>,
  ];
};

const DateInput = ({placeholder, dateState}: DateInputProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = dateState;
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hidePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hidePicker();
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatePicker}>
        <Text>{date?.toISOString() || placeholder}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />
    </View>
  );
};

export default DateInput;
