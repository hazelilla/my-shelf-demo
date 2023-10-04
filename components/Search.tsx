import React from "react";
import { TextInput } from "react-native";
import { View } from "react-native-ui-lib";
import Icon from 'react-native-vector-icons/FontAwesome';

interface SearchProps {
    onChangeText: (text: string) => void;
    value: string;
}

const Search: React.FC<SearchProps> = ({ onChangeText, value }) => {
    return (
        <View row center bg-white paddingH-15 marginT-15 style={{ borderRadius: 10 }}>
            <Icon name="search" size={22} paddingL-30 />
            <TextInput 
                style={{ flex: 1, marginLeft: 10, fontSize: 20 }}
                onChangeText={onChangeText}
                value={value} 
            />
        </View>
    );
};

export default Search;