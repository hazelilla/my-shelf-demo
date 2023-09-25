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
import { useSelector } from 'react-redux';
import BookCard from '../components/BookCard';
import { ScreenProp } from '../types';
import { getBooks } from '../features/BookSlice';
import Icon from "react-native-vector-icons/Octicons";

interface Book {
  name: string;
  author: string;
  date: string;
  code: string;
}

const HomeScreen = ({ navigation }: ScreenProp) => {

  const books: Book[] = useSelector((state) => getBooks(state));

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

          {/* Add book button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FormScreen')}>
            <Text style={{ color: 'beige', fontWeight: 'bold', fontSize: 18 }}>
              ADD BOOK
            </Text>
          </TouchableOpacity>

          {/* Book Cards */}
          <FlatList
            data={books}
            keyExtractor={item => item.code}
            renderItem={({ item }) => (
              <View>

                {/* delete button */}
                <TouchableOpacity>
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
});

export default HomeScreen;
