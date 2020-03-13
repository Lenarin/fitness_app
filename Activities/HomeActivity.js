import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import FoodWidget from '../Widgets/FoodWidget/FoodWidget';
import WaterWidget from '../Widgets/WaterWidget/WaterWidget';
import { FlatList } from 'react-native-gesture-handler';

const widgets = [
  {
    name: "Food",
    widget: FoodWidget
  },
  {
    name: "Water",
    widget: WaterWidget
  }
];

export default function HomeActivity({navigation}) {
    return (
      <View style={styles.container}>
        <FlatList
          data={widgets}
          renderItem={({item}) => {
            const Widget = item.widget;
            
            return (<Widget />);
          }}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e6e6e6',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
  });