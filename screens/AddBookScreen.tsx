import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  Pressable,
  TextInput,
  Platform,
  TouchableOpacity
} from 'react-native';
import { View, Text, Colors, Image, Typography, } from 'react-native-ui-lib';
import { ScreenProp } from '../types';
import Form from '../components/Form';
import { addBook } from '../features/BookSlice';
import { useDispatch } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';

Typography.loadTypographies({
  enter: { fontSize: 45, fontFamily: "RobotoSlab-Regular" },
  iosbutton: { fontSize: 14, fontWeight: "500" },
  empty: { fontSize: 20, fontFamily: "RobotoSlab-Regular" },
  form: { fontSize: 25, fontFamily: "RobotoSlab-Light" }
});

const AddBookScreen = ({ navigation }: ScreenProp) => {

  const [name, setName] = useState();
  const [author, setAuthor] = useState();
  const [date, setDate] = useState("");
  const [code, setCode] = useState();
  const [price, setPrice] = useState();
  const [bookDate, setBookDate] = useState(new Date());
  const [showCalendar, setShowCalendat] = useState(false);

  const handleNavigation = () => { navigation.navigate('HomeScreen') };

  const isFormEmpty = !name || !author || !code || !date || !price;

  const handleDoneButton = () => {
    if (isFormEmpty) {
      Alert.alert('Please fill all forms!')
    } else {
      dispatch(addBook({ ...{ name, author, date, code, price } }))
      navigation.navigate('HomeScreen')
    }
  };

  const dispatch = useDispatch();

  const toggleCalendar = () => {
    setShowCalendat(!showCalendar);
  };

  const onChange = ({ type }: any, selectedDate: any) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setBookDate(currentDate);

      if (Platform.OS === "android") {
        toggleCalendar();
        setDate(currentDate.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }));
      }
    } else {
      toggleCalendar();
    }
  };

  const confirmIOSDate = () => {
    setDate(bookDate.toDateString());
    toggleCalendar();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View marginL-20 flex left>

          {/* Header */}
          <View row>

            {/* Bookmark */}
            <TouchableOpacity onPress={handleNavigation}>
              <Image source={require('../assets/bookmark.png')} width={70} height={110} />
            </TouchableOpacity>

            {/* Title */}
            <Text khaki enter style={styles.titleText}>Enter a book:</Text>
          </View>

          {/* Form */}
          <View marginT-40>
            <Form name={"Name:"} setField={(value: any) => {
              setName(value)
            }} />
            <Form name={"Author:"} setField={(value: any) => {
              setAuthor(value)
            }} />

            {/* Date Picker */}
            <View>
              {showCalendar && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={bookDate}
                  onChange={onChange}
                  maximumDate={new Date()}
                  style={styles.datePicker}
                />
              )}

              {/* IOS Calendar buttons */}
              {showCalendar && Platform.OS === "ios" && (
                <View row style={styles.iosWrapper}>
                  <TouchableOpacity style={styles.iosButton} onPress={toggleCalendar}>
                    <Text iosbutton grey30>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.iosButton} onPress={confirmIOSDate}>
                    <Text iosbutton grey30>Confirm</Text>
                  </TouchableOpacity>
                </View>
              )}

              <View row spread marginB-15>
                <Text form grey30 style={styles.formText}>Date:</Text>
                {!showCalendar && (
                  <Pressable onPress={toggleCalendar}>
                    <TextInput
                      style={styles.input}
                      editable={false}
                      value={date}
                      onChangeText={setDate}
                      onPressIn={toggleCalendar}
                    />
                  </Pressable>)}
              </View>
            </View>

            <Form name={"Code:"} setField={(value: any) => {
              setCode(value)
            }} />
            <Form name={"Price:"} setField={(value: any) => {
              setPrice(value)
            }} />
          </View>

          {/* Done button */}
          <TouchableOpacity style={styles.button} onPress={handleDoneButton}>
            <Text beige button>DONE</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    display: 'flex',
    flex: 1
  },
  scrollView: {
    backgroundColor: 'beige'
  },
  titleText: {
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'brown',
    padding: 10,
    paddingHorizontal: 30,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: 'darkkhaki',
    marginTop: 20
  },
  formText: {
    alignSelf: 'center',
  },
  input: {
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    width: 250,
    backgroundColor: "white",
    fontSize: 20,
    color: "black"
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  iosWrapper: {
    justifyContent: 'space-around'
  },
  iosButton: {
    backgroundColor: "#11182711",
    padding: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15
  },
});

export default AddBookScreen;
