import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Image
 } from 'react-native';
 import { ScreenProp } from '../types';
 import Form from '../components/Form';
 

 const FormScreen = ({navigation}: ScreenProp) => {
   return (
     <SafeAreaView style={{display: 'flex', flex: 1}}>
       <ScrollView style={{backgroundColor: "beige"}} > 
          <View style={styles.sectionContainer}>

            {/* Header */}
            <View style={{flexDirection: 'row'}}>
              {/* Bookmark */}
              <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                <Image source={require('../assets/bookmark.png')} style={{width:70, height:110}}/>
              </TouchableOpacity>

              {/* Title */}
              <Text style={styles.titleText}>Enter a book:</Text>
            </View>
            
            
            {/* Form */}
            <View style={{marginTop: 40}}>
                <Form name={"Name:"}/>
                <Form name={"Author:"}/>
                <Form name={"Date:"}/>
                <Form name={"Code:"}/>
            </View>
           
            {/* Done button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')}> 
               <Text style={{color: "beige", fontWeight: "bold", fontSize: 18}}>DONE</Text>
            </TouchableOpacity> 
             
         </View>
       </ScrollView>
       
     </SafeAreaView>
   );
 }
 
 const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'flex-start',
    marginLeft: 20
  },
  titleText: {
    fontSize: 45,
    fontWeight: '600',
    color: 'darkkhaki',
    fontFamily: 'arial',
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
  }
 });
 
export default FormScreen;
 