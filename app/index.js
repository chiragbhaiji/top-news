import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useArticles} from './hooks/useArticles';

const App = () => {
  const {articles} = useArticles();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({item: {id, title}, index}) => (
          <View key={id} style={styles.row}>
            <Text>{index + 1}</Text>
            <Text>{title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    padding: 8,
  },
});

export default App;
