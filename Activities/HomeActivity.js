import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FoodWidget from '../Widgets/FoodWidget/FoodWidget';
import WaterWidget from '../Widgets/WaterWidget/WaterWidget';

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

export default function HomeActivity() {
    return (
      <View style={styles.container}>
        <FlatList
          data={widgets}
          renderItem={({item}) => {
            // потому что иначе реакт не поймет, что это компонент
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
    paddingTop: 25
  },
});