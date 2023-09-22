import React from "react";
import { Text, View } from "react-native-ui-lib";
import { StyleSheet, FlatList } from "react-native";

interface Book {
    name: string;
    author: string;
    date: string;
    code: string;
}

interface BookCardProps {
    books: Book[];
}

const BookCard: React.FC<BookCardProps> = ({books}) => {
    return(
        <View>
            <FlatList
            data={books}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
                <View style={styles.book}>
                <Text style={styles.bookText}>Name: {item.name}</Text>
                <Text style={styles.bookText}>Author: {item.author}</Text>
                <Text style={styles.bookText}>Date: {item.date}</Text>
                <Text style={styles.bookText}>Code: {item.code}</Text>
                </View>
            )}
            />

            <View style={styles.shelf}/>
        </View>
    );
}

const styles = StyleSheet.create({
    book: {
        width: 370,
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