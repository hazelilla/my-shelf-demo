import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Pressable,
  TextInput,
  Platform
} from 'react-native';
import { ScreenProp } from '../types';
import Form from '../components/Form';
import { addBook } from '../features/BookSlice';
import { useDispatch } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';

const AddBookScreen = ({ navigation }: ScreenProp) => {
  const handleNavigation = () => { navigation.navigate('HomeScreen') };
  const handleDoneButton = () => {
    if (isFormEmpty) {
      Alert.alert('Please fill all forms!')
    } else {
      dispatch(addBook({ ...{ name, author, date, code, price } }))
      navigation.navigate('HomeScreen')
    }
  };

  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [author, setAuthor] = useState();
  const [date, setDate] = useState("");
  const [code, setCode] = useState();
  const [price, setPrice] = useState();

  const [bookDate, setBookDate] = useState(new Date());
  const [showCalendar, setShowCalendat] = useState(false);

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

  const isFormEmpty = !name || !author || !code || !date || !price;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.sectionContainer}>

          {/* Header */}
          <View style={styles.header}>

            {/* Bookmark */}
            <TouchableOpacity onPress={handleNavigation}>
              <Image source={require('../assets/bookmark.png')} style={styles.bookmark} />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.titleText}>Enter a book:</Text>
          </View>


          {/* Form */}
          <View style={styles.formView}>
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
                <View style={styles.iosWrapper}>
                  <TouchableOpacity style={styles.iosButton} onPress={toggleCalendar}>
                    <Text style={styles.iosButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.iosButton} onPress={confirmIOSDate}>
                    <Text style={styles.iosButtonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.form}>
                <Text style={styles.formText}>Date:</Text>
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
            <Text style={styles.buttonText}>DONE</Text>
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
  sectionContainer: {
    alignItems: 'flex-start',
    marginLeft: 20
  },
  header: {
    flexDirection: 'row'
  },
  bookmark: {
    width: 70,
    height: 110
  },
  titleText: {
    fontSize: 45,
    color: 'darkkhaki',
    fontFamily: "RobotoSlab-Regular",
    alignSelf: 'center',
  },
  formView: {
    marginTop: 40
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
  buttonText: {
    color: "beige",
    fontSize: 18,
    fontFamily: "RobotoSlab-Medium"
  },
  form: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  formText: {
    fontSize: 25,
    alignSelf: 'center',
    color: 'gray',
    marginRight: 10,
    fontFamily: "RobotoSlab-Light"
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
    flexDirection: 'row',
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
  iosButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "gray"
  }
});

export default AddBookScreen;
