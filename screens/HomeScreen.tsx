import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {View, Text, Colors, Image, Typography, TouchableOpacity} from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import BookCard from '../components/BookCard';
import { ScreenProp } from '../types';
import { getBooks, removeBook, emptyShelf } from '../features/BookSlice';
import Icon from 'react-native-vector-icons/Octicons';
import SortModal from '../modals/SortModal';

interface Book {
  name: string;
  author: string;
  date: any;
  code: any;
  price: number;
}

Colors.loadColors({
  khaki: 'darkkhaki',
  beige: 'beige'
});

Typography.loadTypographies({
  title: {fontSize: 50, fontFamily: "RobotoSlab-SemiBold"},
  button: {fontSize: 18, fontFamily: "RobotoSlab-SemiBold"},
  empty: {fontSize: 20, fontFamily: "RobotoSlab-Regular",}
});

const HomeScreen = ({ navigation }: ScreenProp) => {
  const handleNavigation = () => {
    navigation.navigate('FormScreen');
  };
  const [_books, setBooks] = useState<Book[]>([]);

  const books: Book[] = useSelector(state => getBooks(state));

  const [sortingOption, setSortingOption] = useState<keyof Book>('name');
  const handleSortOptionChange = (option: keyof Book) => {
    setSortingOption(option);
  };

  const [sortingDirection, setSortingDirection] = useState<string>('ascending');
  const handleSortingDirection = (option: string) => {
    setSortingDirection(option);
  };

  const parseDate = (dateStr: string): Date => {
    const [month, day, year] = dateStr.split(' ');
    const monthIndex = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    const parsedMonthIndex = monthIndex[month as keyof typeof monthIndex] ?? 0;
  
    return new Date(parseInt(year), parsedMonthIndex, parseInt(day));
  };

  useEffect(() => {
    if (books) {
      setBooks(books);
    }
  }, [books]);

  const sortedBooks = (key: keyof Book): Book[] => {
    const sortedBooks = _books.slice().sort(function (a, b) {
      switch (key) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'price':
          return +a.price - +b.price;
        case 'date':
          const dateA = parseDate(a.date);
          const dateB = parseDate(b.date);
          return dateA.getTime() - dateB.getTime();
        default:
          return 0;
      }
    });
    if (sortingDirection !== 'ascending') {
      return sortedBooks.slice().reverse();
    } else {
      return sortedBooks;
    }
  };
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

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
          },
        },
      ],
      { cancelable: false },
    );
  };

  const removeAllBooksFromShelf = () => {
    Alert.alert(
      'Confirm Empty Shelf',
      'Are you sure you want to empty your shelf?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Empty Shelf',
          onPress: () => {
            dispatch(emptyShelf({}));
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View flex>
        <View flex center>
          {/* Header */}
          <View row>
            {/* Title */}
            <Text title khaki style={styles.titleText}>MY SHELF</Text>

            {/* Bookmark */}
            <TouchableOpacity onPress={handleNavigation}>
              <Image
                source={require('../assets/bookmark.png')}
                width={70} height={110}
                style={styles.bookmark}
              />
            </TouchableOpacity>
          </View>

          {/* Add Book Button */}
          <TouchableOpacity style={styles.button} onPress={handleNavigation}>
            <Text button beige>ADD BOOK</Text>
          </TouchableOpacity>

          {/* Empty Shelf Button */}
          {books.length > 1 && (
            <View row>
              <TouchableOpacity onPress={removeAllBooksFromShelf}>
                <Text empty marginB-15 style={styles.emptyShelf}>EMPTY SHELF</Text>
              </TouchableOpacity>

              {/* Sort */}
              <View>
                {modalVisible && (
                  <SortModal
                    visible={true}
                    hideModal={() => setModalVisible(false)}
                    optionChange={handleSortOptionChange}
                    directionChange={handleSortingDirection}
                    selectedOption={sortingOption}
                    selectedDirection={sortingDirection}
                  />
                )}

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Icon name="sort-desc" size={35} style={styles.sort} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Book Cards */}
          <FlatList
            data={sortedBooks(sortingOption)}
            keyExtractor={item => item.code}
            renderItem={({ item }) => (
              <View>
                {/* Delete Button */}
                <TouchableOpacity
                  onPress={() => removeBookFromShelf(item.code)}>
                  <Icon name="repo-deleted" size={35} style={styles.bin} />
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
    backgroundColor: 'beige',
  },
  titleText: {
    alignSelf: 'center',
    left: 20,
  },
  bookmark: {
    left: 50,
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
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    left: '10%',
  },
  sort: {
    color: 'black',
    left: '250%',
  },
  bin: {
    color: 'black',
    marginBottom: 5,
  },
});

export default HomeScreen;









// const sortedBooks = [...books];
  // if (sortingOption === 'bookName' && sortingDirection === 'ascending') {
  //   sortedBooks.sort((a, b) => (a.name > b.name ? 1 : -1));
  // } else if (
  //   sortingOption === 'bookName' &&
  //   sortingDirection === 'descending'
  // ) {
  //   sortedBooks.sort((a, b) => (a.name > b.name ? -1 : 1));
  // } else if (sortingOption === 'author' && sortingDirection === 'ascending') {
  //   sortedBooks.sort((a, b) => (a.author > b.author ? 1 : -1));
  // } else if (sortingOption === 'author' && sortingDirection === 'descending') {
  //   sortedBooks.sort((a, b) => (a.author > b.author ? -1 : 1));
  // } else if (sortingOption === 'date' && sortingDirection === 'ascending') {
  //   sortedBooks.sort((a, b) => {
  //     const dateA: any = new Date(
  //       a.date.replace(/-/g, '.').replace(/\./g, '-'),
  //     );
  //     const dateB: any = new Date(
  //       b.date.replace(/-/g, '.').replace(/\./g, '-'),
  //     );
  //     if (dateA.getFullYear() !== dateB.getFullYear()) {
  //       return dateA.getFullYear() - dateB.getFullYear();
  //     } else if (dateA.getMonth() !== dateB.getMonth()) {
  //       return dateA.getMonth() - dateB.getMonth();
  //     } else {
  //       return dateA.getDate() - dateB.getDate();
  //     }
  //   });
  // } else if (sortingOption === 'date' && sortingDirection === 'descending') {
  //   sortedBooks.sort((a, b) => {
  //     const dateA: any = new Date(
  //       a.date.replace(/-/g, '.').replace(/\./g, '-'),
  //     );
  //     const dateB: any = new Date(
  //       b.date.replace(/-/g, '.').replace(/\./g, '-'),
  //     );
  //     if (dateA.getFullYear() !== dateB.getFullYear()) {
  //       return dateB.getFullYear() - dateA.getFullYear();
  //     } else if (dateA.getMonth() !== dateB.getMonth()) {
  //       return dateB.getMonth() - dateA.getMonth();
  //     } else {
  //       return dateB.getDate() - dateA.getDate();
  //     }
  //   });
  // } else if (sortingOption === 'price' && sortingDirection === 'ascending') {
  //   sortedBooks.sort((a, b) => a.price - b.price);
  // } else if (sortingOption === 'price' && sortingDirection === 'descending') {
  //   sortedBooks.sort((a, b) => b.price - a.price);
  // }