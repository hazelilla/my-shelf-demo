import React, { useState } from 'react';
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
    selectedOption: string;
    selectedDirection: string;
}

const SortModal = ({
    visible,
    hideModal,
    optionChange,
    directionChange,
    selectedOption,
    selectedDirection
}: SortModalProps) => {
    const [selectedSortType, setSelectedSortType] = useState(selectedOption);
    const [selectedSortDirection, setSelectedSortDirection] = useState(selectedDirection);
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
            name: 'Price',
            key: 'price',
        },
        {
            id: 3,
            name: 'Date',
            key: 'date',
        },    

    ];

    const directionOptions = [
        {
            id: 0,
            name: 'Ascending',
            key: 'ascending',
        },
        {
            id: 1,
            name: 'Descending',
            key: 'descending'
        }
    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
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

                        {/* Checkbox for sorting by book name, author, date and price */}
                        <View style={styles.checkBoxWrapper}>
                            {sortingOptions.map((item: any, index: number) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.checkboxContainer}
                                        onPress={() => {
                                            setSelectedSortType(item.key);
                                            optionChange(item.key);
                                        }}>
                                        <Text style={styles.checkboxLabel}>{item.name}</Text>
                                        {item.key === selectedSortType
                                            ?
                                            <Icon name='checkbox-marked' color="black" size={30} />
                                            :
                                            <Icon name='checkbox-blank-outline' color="black" size={30} />}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Ascending and Descending checkbox*/}
                        <View style={{ borderTopWidth: 3 }}>
                            {directionOptions.map((item: any, index: number) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.checkboxContainer}
                                        onPress={() => {
                                            setSelectedSortDirection(item.key);
                                            directionChange(item.key);
                                        }}>
                                        <Text style={styles.checkboxLabel}>{item.name}</Text>
                                        {item.key === selectedSortDirection
                                            ?
                                            <Icon name='checkbox-marked' color="black" size={30} />
                                            :
                                            <Icon name='checkbox-blank-outline' color="black" size={30} />}
                                    </TouchableOpacity>
                                );
                            })}
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
