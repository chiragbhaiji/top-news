import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export const ArticleListItem = ({data}) => {
  const {title, publishedAt, author, urlToImage} = data;

  const dateForDisplay = new Date(publishedAt);

  return (
    <View style={styles.container}>
      <Image source={{uri: urlToImage}} style={styles.img} />
      <View style={styles.contentContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.date}>{dateForDisplay.toDateString()}</Text>
        <Text numberOfLines={1} style={styles.author}>
          by {author}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderColor: '#555',
    borderWidth: 1,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
  img: {
    width: 120,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
  },
  author: {
    fontSize: 11,
    color: 'gray',
    fontStyle: 'italic',
    textAlign: 'right',
  },
  date: {
    marginVertical: 4,
    fontSize: 11,
    color: 'gray',
  },
});
