import React, { useState } from 'react';
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
import SortModal from '../modals/SortModal';

interface Book {
  name: string;
  author: string;
  date: any;
  code: any;
  price: number;
}

const HomeScreen = ({ navigation }: ScreenProp) => {

  const handleNavigation = () => {navigation.navigate('FormScreen')};

  const books: Book[] = useSelector((state) => getBooks(state));

  const [sortingOption, setSortingOption] = useState<string | null>(null);
  const handleSortOptionChange = (option: string, isSelected: boolean) => {
    if (isSelected) {
      setSortingOption(option);
    } else {
      setSortingOption(null);
    }
  };

  const [sortingDirection, setSortingDirection] = useState<string | null>(null);
  const handleSortingDirection = (option: string, isSelected: boolean) => {
    if (isSelected) {
      setSortingDirection(option);
    } else {
      setSortingDirection(null);
    }
  };

  const sortedBooks = [...books];
  if (sortingOption === "bookName" && sortingDirection === "ascending"){
    sortedBooks.sort((a, b) => a.name > b.name ? 1 : -1)
  } else if (sortingOption === "bookName" && sortingDirection === "descending"){
    sortedBooks.sort((a, b) => a.name > b.name ? -1 : 1)
  } else if (sortingOption === "author" && sortingDirection === "ascending"){
    sortedBooks.sort((a, b) => a.author > b.author ? 1 : -1)
  } else if (sortingOption === "author" && sortingDirection === "descending"){
    sortedBooks.sort((a, b) => a.author > b.author ? -1 : 1)
  } else if (sortingOption === "date" && sortingDirection === "ascending"){
    sortedBooks.sort((a, b) => {
      const dateA: any = new Date(a.date.replace(/-/g, '.').replace(/\./g, '-'));
      const dateB: any = new Date(b.date.replace(/-/g, '.').replace(/\./g, '-'));
      if (dateA.getFullYear() !== dateB.getFullYear()) {
        return dateA.getFullYear() - dateB.getFullYear();
      } else if (dateA.getMonth() !== dateB.getMonth()) {
        return dateA.getMonth() - dateB.getMonth();
      } else {
        return dateA.getDate() - dateB.getDate();
      }
    });
  } else if (sortingOption === "date" && sortingDirection === "descending"){
    sortedBooks.sort((a, b) => {
      const dateA: any = new Date(a.date.replace(/-/g, '.').replace(/\./g, '-'));
      const dateB: any = new Date(b.date.replace(/-/g, '.').replace(/\./g, '-'));
      if (dateA.getFullYear() !== dateB.getFullYear()) {
        return dateB.getFullYear() - dateA.getFullYear();
      } else if (dateA.getMonth() !== dateB.getMonth()) {
        return dateB.getMonth() - dateA.getMonth();
      } else {
        return dateB.getDate() - dateA.getDate();
      }
    });
  } else if (sortingOption === "price" && sortingDirection === "ascending"){
    sortedBooks.sort((a, b) => a.price - b.price)
  } else if (sortingOption === "price" && sortingDirection === "descending"){
    sortedBooks.sort((a, b) => b.price - a.price)
  }

  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false)
  
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
            <TouchableOpacity onPress={handleNavigation}>
              <Image
                source={require('../assets/bookmark.png')}
                style={styles.bookmark}
              />
            </TouchableOpacity>
          </View>

          {/* Add Book Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleNavigation}>
            <Text style={styles.buttonText}>
              ADD BOOK
            </Text>
          </TouchableOpacity>

          {/* Empty Shelf Button */}
          {books.length > 1 && (
            <View style={styles.actions}>
              <TouchableOpacity onPress={removeAllBooksFromShelf}>
                <Text style={styles.emptyShelf}>
                  EMPTY SHELF
                </Text>
              </TouchableOpacity>

              {/* Sort */}
              <View>
                {
                  modalVisible &&
                  <SortModal 
                    visible={modalVisible}
                    hideModal={() => setModalVisible(false)}
                    optionChange = {handleSortOptionChange}
                    directionChange = {handleSortingDirection}
                  />
                }
                
                <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                  <Icon name='sort-desc' size={35} style={styles.sort}/>  
                </TouchableOpacity>
              </View>
            </View>
          )}  

          {/* Book Cards */}
          <FlatList
            data={sortedBooks}
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
                  price={item.price}
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
  actions: {
    flexDirection: 'row',
  },
  emptyShelf: {
    fontSize: 20, 
    borderBottomWidth: 1, 
    borderRightWidth: 1, 
    borderLeftWidth:1, 
    borderColor: 'gray', 
    paddingHorizontal: 10,
    marginBottom: 15,
    left: "10%"
  },
  sort: {
    color: "black",
    left: "250%"
  },
  icon: {
    color: "black",
    marginBottom: 5
  }
});

export default HomeScreen;
