import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const placeholderImgSource = require('../../assets/images/placeholder.png');
const pinImgSource = require('../../assets/icons/pin/pin.png');

export const ArticleListItem = ({data}) => {
  const {title, publishedAt, author, urlToImage, isPinned} = data;

  const dateForDisplay = new Date(publishedAt);

  return (
    <View style={styles.container}>
      <Image
        source={urlToImage ? {uri: urlToImage} : placeholderImgSource}
        style={styles.img}
      />
      <View style={styles.contentContainer}>
        <Text numberOfLines={3} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.date}>{dateForDisplay.toDateString()}</Text>
        <View style={styles.footer}>
          <Text numberOfLines={1} style={styles.author}>
            {`by: ${author}`}
          </Text>
          {isPinned && <Image source={pinImgSource} style={styles.pinImg} />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#444',
    borderWidth: 1,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  img: {
    width: 120,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pinImg: {
    height: 8,
    aspectRatio: 1,
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
  },
  date: {
    marginVertical: 8,
    fontSize: 11,
    color: 'gray',
  },
});
