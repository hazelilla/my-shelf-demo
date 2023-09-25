import React from "react";
import { Text, View } from "react-native-ui-lib";
import { StyleSheet, TextInput } from "react-native";

const Form = ({name, setField} : {name: string, setField:Function}) => {

    const handleSetField = (value: any) => {setField(value)}

    return(
        <View>
            <View style={styles.form}>
                <Text style={styles.formText}>{name}</Text>
                <TextInput onChangeText={handleSetField} style={styles.input}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginBottom: 15,
    },
    formText: {
        fontSize: 25, 
        alignSelf:'center',
        color: 'gray',
        marginRight: 10
    },
    input: {
        borderWidth: 1, 
        borderRadius: 10, 
        borderColor: "gray", 
        width:250, 
        backgroundColor: "white", 
        fontSize: 20
    }
});

export default Form;