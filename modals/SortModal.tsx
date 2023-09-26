import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SortModalProps {
  visible: boolean;
  hideModal: () => void;
  optionChange: any;
  directionChange: any;
}

const SortModal = ({
  visible,
  hideModal,
  optionChange,
  directionChange,
}: SortModalProps) => {
  const [selectedSortType, setSelectedSortType] = useState<number>(0);
  const [sortByAscending, setSortByAscending] = useState(false);
  const [sortByDescending, setSortByDescending] = useState(false);
  const sortingOptions = [
    {
      id: 0,
      name: 'Book Name',
      key: 'name',
    },
    {
      id: 1,
      name: 'Author',
      key: 'author',
    },
    {
      id: 2,
      name: 'Date',
      key: 'date',
    },
    {
      id: 3,
      name: 'Price',
      key: 'price',
    },
    {
      id: 4,
      name: 'Code',
      key: 'code',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <Modal
        animationOut={'zoomIn'}
        isVisible={visible}
        statusBarTranslucent={true}>
        <View style={styles.container}>
          <View>
            {/* Close Button */}
            <TouchableOpacity
              onPress={() => {
                hideModal();
              }}>
              <Icon name="close" color="black" size={30} />
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.title}>Sort by:</Text>
            </View>

            <View style={styles.checkBoxWrapper}>
              {/* Checkbox for sorting by book name */}
              {sortingOptions.map((item: any, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.checkboxContainer}
                    onPress={() => {
                      setSelectedSortType(item.id);
                      optionChange(item.key);
                    }}>
                    <Text style={styles.checkboxLabel}>{item.name}</Text>
                    {item.id === selectedSortType ? <Text>seçildi</Text> : null}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Ascending and Descending */}
            <View style={{borderTopWidth: 3}}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => {
                  setSortByAscending(!sortByAscending);
                  directionChange('ascending', !sortByAscending);
                }}>
                <Text style={styles.checkboxLabel}>Ascending</Text>
                <Icon
                  name={
                    sortByAscending
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                  }
                  color="black"
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => {
                  setSortByDescending(!sortByDescending);
                  directionChange('descending', !sortByDescending);
                }}>
                <Text style={styles.checkboxLabel}>Descending</Text>
                <Icon
                  name={
                    sortByDescending
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                  }
                  color="black"
                  size={30}
                />
              </TouchableOpacity>
            </View>

            {/* Done Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                hideModal();
              }}>
              <Text style={styles.buttonText}>DONE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  header: {},
  title: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'beige',
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: 'darkkhaki',
    marginTop: 40,
    marginBottom: 10,
    maxWidth: Dimensions.get('window').width * 0.3,
  },
  buttonText: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  checkBoxWrapper: {
    marginTop: 20,
    marginBottom: 100,
  },
  checkboxContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  checkboxLabel: {
    fontSize: 25,
  },
});

export default SortModal;
