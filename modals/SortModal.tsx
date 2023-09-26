import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface SortModalProps {
    visible: boolean; 
    hideModal: () => void; 
    optionChange: any;
    directionChange: any;
}

const SortModal = ({ visible, hideModal, optionChange, directionChange }: SortModalProps) => {
    const [sortByBookName, setSortByBookName] = useState(false);
    const [sortByAuthor, setSortByAuthor] = useState(false);
    const [sortByDate, setSortByDate] = useState(false);
    const [sortByPrice, setSortByPrice] = useState(false);

    const [sortByAscending, setSortByAscending] = useState(false);
    const [sortByDescending, setSortByDescending] = useState(false);

    return (
        <SafeAreaView style={{flex:1}}>
            <Modal
                animationOut={"zoomIn"}
                isVisible={visible}
                statusBarTranslucent={true}
            >
                <View style={styles.container}>
                    <View>
                    {/* Close Button */}
                    <TouchableOpacity
                            onPress={() => {
                                hideModal()
                            }}>
                            <Icon
                                name='close'
                                color="black"
                                size={30}

                            />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <Text style={styles.title}>Sort by:</Text>
                    </View>

                    <View style={styles.checkBoxWrapper}>
                        {/* Checkbox for sorting by book name */}
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => {
                                setSortByBookName(!sortByBookName);
                                optionChange('bookName', !sortByBookName);
                            }}>
                            <Text style={styles.checkboxLabel}>Book Name</Text>
                            <Icon
                                name={sortByBookName ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                color="black"
                                size={30}
                            />
                        </TouchableOpacity>


                        {/* Checkbox for sorting by author */}
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => {
                                setSortByAuthor(!sortByAuthor);
                                optionChange('author', !sortByAuthor);
                            }}>
                            <Text style={styles.checkboxLabel}>Author</Text>
                            <Icon
                                name={sortByAuthor ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                color="black"
                                size={30}
                            />
                        </TouchableOpacity>

                        {/* Checkbox for sorting by date */}
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => {
                                setSortByDate(!sortByDate);
                                optionChange('date', !sortByDate);
                            }}>
                            <Text style={styles.checkboxLabel}>Date</Text>
                            <Icon
                                name={sortByDate ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                color="black"
                                size={30}
                            />
                        </TouchableOpacity>

                        {/* Checkbox for sorting by price */}
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => {
                                setSortByPrice(!sortByPrice);
                                optionChange('price', !sortByPrice);
                            }}>
                            <Text style={styles.checkboxLabel}>Price</Text>
                            <Icon
                                name={sortByPrice ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                color="black"
                                size={30}
                            />
                        </TouchableOpacity>
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
                                name={sortByAscending ? 'checkbox-marked' : 'checkbox-blank-outline'}
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
                                name={sortByDescending ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                color="black"
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Done Button */}
                    <TouchableOpacity style={styles.button} onPress={() => {hideModal()}}>
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
    header: {
        
    },
    title: {
        fontSize: 30,
        color: "black",
        textAlign: 'center'
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
        width: "28%",
    },
    buttonText: {
        color: "black", 
        fontWeight: "bold", 
        fontSize: 18
    },
    checkBoxWrapper: {
        marginTop: 20,
        marginBottom: 100
    },
    checkboxContainer: {
        marginTop: 10,    
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    checkboxLabel: {
        fontSize: 25,
    }
});

export default SortModal;