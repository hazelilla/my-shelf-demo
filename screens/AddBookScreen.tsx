import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { ScreenProp } from '../types';
import Form from '../components/Form';
import { addBook } from '../features/BookSlice';
import { useDispatch } from "react-redux";

const AddBookScreen = ({ navigation }: ScreenProp) => {
  const handleNavigation = () => {navigation.navigate('HomeScreen')};
  const handleDoneButton = () => {
    if (isFormEmpty) {
      Alert.alert('Please fill all forms!') 
      } else {
      dispatch(addBook({ ...{ name, author, date, code } }))
      navigation.navigate('HomeScreen')
      }
  };

  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [author, setAuthor] = useState();
  const [code, setCode] = useState();
  const [date, setDate] = useState();

  const isFormEmpty = !name || !author || !code || !date;

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
            <Form name={"Name:"} setField={(value: any)=>{
                setName(value)
            }} />
            <Form name={"Author:"} setField={(value: any)=>{
                setAuthor(value)
            }} />
            <Form name={"Date:"} setField={(value: any)=>{
                setDate(value)
            }} />
            <Form name={"Code:"} setField={(value: any)=>{
                setCode(value)
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
    fontWeight: '600',
    color: 'darkkhaki',
    fontFamily: 'arial',
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
    fontWeight: "bold", 
    fontSize: 18
  }
});

export default AddBookScreen;
