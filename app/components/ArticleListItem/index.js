import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Theme from '../../Theme';

const color = Theme.color;

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
        <Text numberOfLines={2} style={styles.title}>
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
    borderColor: color.border,
    borderWidth: 1,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: color.bg.secondary,
  },
  img: {
    width: 120,
    borderRadius: 8,
    resizeMode: 'cover',
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
    color: color.text.primary,
  },
  author: {
    fontSize: 11,
    color: color.text.secondary,
  },
  date: {
    marginVertical: 8,
    fontSize: 11,
    color: color.text.secondary,
  },
});
