import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BookCard from '../components/BookCard';
import { ScreenProp } from '../types';
import { getBooks, removeBook, emptyShelf } from '../features/BookSlice';
import Icon from "react-native-vector-icons/Octicons";

interface Book {
  name: string;
  author: string;
  date: string;
  code: string;
}

const HomeScreen = ({ navigation }: ScreenProp) => {

  const books: Book[] = useSelector((state) => getBooks(state));

  const dispatch = useDispatch();

  const removeBookFromShelf = (code: string) => {
    dispatch(removeBook({ code }))
  }

  const removeAllBooksFromShelf = () => {
    dispatch(emptyShelf({}))
  }
  

  return (
    <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: 'beige' }}>
      <View style={{ flex: 1 }}>
        <View style={styles.sectionContainer}>
          {/* Header */}
          <View style={{ flexDirection: 'row' }}>
            {/* Title */}
            <Text style={styles.titleText}>MY SHELF</Text>

            {/* Bookmark */}
            <TouchableOpacity onPress={() => navigation.navigate('FormScreen')}>
              <Image
                source={require('../assets/bookmark.png')}
                style={{ width: 70, height: 110, left: 50 }}
              />
            </TouchableOpacity>
          </View>

          {/* Add Book Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FormScreen')}>
            <Text style={{ color: 'beige', fontWeight: 'bold', fontSize: 18 }}>
              ADD BOOK
            </Text>
          </TouchableOpacity>

          {/* Empty Shelf Button */}
          {books.length > 1 && (
          <TouchableOpacity onPress={removeAllBooksFromShelf}>
            <Text style={styles.emptyShelf}>
              EMPTY SHELF
            </Text>
          </TouchableOpacity>
          )}

          {/* Book Cards */}
          <FlatList
            data={books}
            keyExtractor={item => item.code}
            renderItem={({ item }) => (
              <View>

                {/* Delete Button */}
                <TouchableOpacity onPress={() => removeBookFromShelf(item.code)}>
                  <Icon name="repo-deleted" size={35} color="black" style={{marginBottom: 5}} />
                </TouchableOpacity>
              
                <BookCard
                  name={item.name}
                  author={item.author}
                  date={item.date}
                  code={item.code}
                />
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'center',
    flex: 1
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
  emptyShelf: {
    fontSize: 20, 
    borderBottomWidth: 1, 
    borderRightWidth: 1, 
    borderLeftWidth:1, 
    borderColor: 'gray', 
    paddingHorizontal: 10,
    marginBottom: 15
  }
});

export default HomeScreen;
