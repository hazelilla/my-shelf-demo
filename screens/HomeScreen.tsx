import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import BookCard from '../components/BookCard';
import {ScreenProp} from '../types';

interface Book {
  name: string;
  author: string;
  date: string;
  code: string;
}

const HomeScreen = ({navigation}: ScreenProp) => {
  const books: Book[] = [
    {
      name: 'The Little Prince',
      author: 'Antoine de Saint-Exupery',
      date: '01.09.1998',
      code: 'SJADH74637',
    },
    {
      name: 'Jane Eyre',
      author: 'Charlotte Bronte',
      date: '30.11.1870',
      code: '23LKOD87',
    },
    {
      name: 'The Da Vinci Code',
      author: 'Dan Brown',
      date: '11.10.1999',
      code: 'A35GN',
    },
    {
      name: 'Pride and Prejudice',
      author: 'Jane Austen',
      date: '23.02.1679',
      code: 'VNDQW7',
    },
  ];

  return (
    <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'beige'}}>
      {/* <ScrollView style={{backgroundColor: 'beige'}}> */}
      <View style={{flex: 1}}>
        <View style={styles.sectionContainer}>
          {/* Header */}
          <View style={{flexDirection: 'row'}}>
            {/* Title */}
            <Text style={styles.titleText}>MY SHELF</Text>

            {/* Bookmark */}
            <TouchableOpacity onPress={() => navigation.navigate('FormScreen')}>
              <Image
                source={require('../assets/bookmark.png')}
                style={{width: 70, height: 110, left: 50}}
              />
            </TouchableOpacity>
          </View>

          {/* Add book button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FormScreen')}>
            <Text style={{color: 'beige', fontWeight: 'bold', fontSize: 18}}>
              ADD BOOK
            </Text>
          </TouchableOpacity>

          {/* Book cards */}
          <FlatList
            style={{}}
            data={books}
            keyExtractor={item => item.code}
            renderItem={({item}) => (
              <BookCard
                name={item.name}
                author={item.author}
                date={item.date}
                code={item.code}
              />
            )}
          />
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'center',
    flex:1
  },
  titleText: {
    fontSize: 45,
    fontWeight: '700',
    color: 'darkkhaki',
    fontFamily: 'arial',
    alignSelf: 'center',
    left: 20,
  },
  button: {
    backgroundColor: 'brown',
    padding: 10,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: 'darkkhaki',
    margin: 20,
  },
});

export default HomeScreen;
