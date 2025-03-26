import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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

  const dynamicStyles = StyleSheet.create({
    text: {
      color: date ? 'black' : '#8391A1',
    },
  });

  return (
    <View>
      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        <Text style={dynamicStyles.text}>
          {date?.toISOString() || placeholder}
        </Text>
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

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: 8,
    backgroundColor: '#F7F8F9',
    padding: 18,
  },
});

export default DateInput;
