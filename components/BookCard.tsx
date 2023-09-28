import React from "react";
import { Text, View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";

const BookCard = ({name, author, date, code, price} : {name: string, author: string, date: any, code: string, price: number}) => {
    return(
        <View>
            <View style={styles.book}>
                <Text style={styles.bookText}>Name: {name}</Text>
                <Text style={styles.bookText}>Author: {author}</Text>
                <Text style={styles.bookText}>Date: {date}</Text>
                <Text style={styles.bookText}>Code: {code}</Text>
                <Text style={styles.bookText}>Price: {price}$</Text>
            </View>
            <View style={styles.shelf}/>
        </View>
    );
}
const styles = StyleSheet.create({
    book: {
        width: "98%",
        backgroundColor: "white", 
        padding: 15,
        paddingHorizontal: 40,
        borderLeftWidth: 15,
        borderLeftColor: "maroon",
        marginBottom: 40, 
        paddingBottom: 30
    },
    bookText: {
        fontSize: 21,
        fontFamily: "RobotoSlab-Regular",
        borderBottomWidth: 1,
        color: "gray",
        borderBottomColor: "gainsboro",
    },
    shelf: {
        backgroundColor: "chocolate", 
        paddingHorizontal: 180, 
        paddingVertical: 8, 
        marginBottom: 30
    }
});

export default BookCard;