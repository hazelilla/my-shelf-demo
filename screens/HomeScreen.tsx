import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert
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
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this book?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(removeBook({ code }));
          }
        }
      ],
      { cancelable: false }
    );
  };
  

  const removeAllBooksFromShelf = () => {
    Alert.alert(
      'Confirm Empty Shelf',
      'Are you sure you want to empty your shelf?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Empty Shelf',
          onPress: () => {
            dispatch(emptyShelf({}));
          }
        }
      ],
      { cancelable: false }
    );
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          {/* Header */}
          <View style={styles.header}>
            {/* Title */}
            <Text style={styles.titleText}>MY SHELF</Text>

            {/* Bookmark */}
            <TouchableOpacity onPress={() => navigation.navigate('FormScreen')}>
              <Image
                source={require('../assets/bookmark.png')}
                style={styles.bookmark}
              />
            </TouchableOpacity>
          </View>

          {/* Add Book Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FormScreen')}>
            <Text style={styles.buttonText}>
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
                  <Icon name="repo-deleted" size={35} style={styles.icon} />
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
  safeArea: {
    display: 'flex', 
    flex: 1, 
    backgroundColor: 'beige'
  },
  container: {
    flex: 1
  },
  sectionContainer: {
    alignItems: 'center',
    flex: 1
  },
  header: {
    flexDirection: 'row'
  },
  titleText: {
    fontSize: 45,
    fontWeight: '700',
    color: 'darkkhaki',
    fontFamily: 'arial',
    alignSelf: 'center',
    left: 20,
  },
  bookmark: {
    width: 70, 
    height: 110, 
    left: 50 
  },
  button: {
    backgroundColor: 'brown',
    padding: 10,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: 'darkkhaki',
    margin: 20,
  },
  buttonText: {
    color: 'beige', 
    fontWeight: 'bold', 
    fontSize: 18
  },
  emptyShelf: {
    fontSize: 20, 
    borderBottomWidth: 1, 
    borderRightWidth: 1, 
    borderLeftWidth:1, 
    borderColor: 'gray', 
    paddingHorizontal: 10,
    marginBottom: 15
  },
  icon: {
    color: "black",
    marginBottom: 5
  }
});

export default HomeScreen;
