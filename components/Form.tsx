import React from "react";
import { Text, View } from "react-native-ui-lib";
import { StyleSheet, TextInput } from "react-native";


const Form = ({name, setField} : {name: string, setField:Function}) => {

    const handleSetField = (value: any) => {setField(value)}

    return(
        <View>
            <View row spread marginB-15>
                <Text form grey30 marginR-10 style={styles.formText}>{name}</Text>
                <TextInput onChangeText={handleSetField} style={styles.input}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formText: {
        alignSelf:'center',
    },
    input: {
        paddingLeft: 10,
        borderWidth: 1, 
        borderRadius: 10, 
        borderColor: "gray", 
        width:250, 
        backgroundColor: "white", 
        fontSize: 20
    }
});

export default Form;