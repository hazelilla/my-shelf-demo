import React from "react";
import { Text, View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";


const BookCard = ({ name, author, date, code, price }: { name: string, author: string, date: any, code: string, price: number }) => {
    return (
        <View>
            <View padding-15 paddingH-40 paddingB-30 marginB-40 bg-white width={"98%"} style={styles.book}>
                <Text book grey30 style={styles.bookText}>Name: {name}</Text>
                <Text book grey30 style={styles.bookText}>Author: {author}</Text>
                <Text book grey30 style={styles.bookText}>Date: {date}</Text>
                <Text book grey30 style={styles.bookText}>Code: {code}</Text>
                <Text book grey30 style={styles.bookText}>Price: {price}$</Text>
            </View>
            <View paddingH-180 paddingV-8 marginB-30 backgroundColor="chocolate"/>
        </View>
    );
}
const styles = StyleSheet.create({
    book: {
        borderLeftWidth: 15,
        borderLeftColor: "maroon",
    },
    bookText: {
        borderBottomWidth: 1,
        borderBottomColor: "gainsboro",
    }
});

export default BookCard;