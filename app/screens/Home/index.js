import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SwipeableFlatList from 'react-native-swipeable-list';

import {ArticleListItem} from '../../components/ArticleListItem';
import {Header} from '../../components/Header';
import {useArticles} from '../../hooks/useArticles';
import Theme from '../../Theme';

const refreshIcon = require('../../assets/icons/refresh/refresh.png');
const deleteIcon = require('../../assets/icons/delete/delete.png');
const pinIcon = require('../../assets/icons/pin/pin.png');

const color = Theme.color;

const Home = () => {
  const {articles, isLoading, isError, manualFetch, deleteArticle, pinArticle} =
    useArticles();

  const QuickActions = ({id}) => {
    return (
      <View style={styles.actionsContainer}>
        <Pressable
          style={styles.actionContainer}
          onPress={() => deleteArticle(id)}>
          <Image style={styles.actionIconImg} source={deleteIcon} />
        </Pressable>
        <Pressable
          style={styles.actionContainer}
          onPress={() => pinArticle(id)}>
          <Image style={styles.actionIconImg} source={pinIcon} />
        </Pressable>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Headlines"
        right={{iconSource: refreshIcon, action: manualFetch}}
      />
      {isError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {'Something went wrong!\nUnable to fetch latest news'}
          </Text>
        </View>
      )}
      <SwipeableFlatList
        data={articles}
        contentContainerStyle={styles.listContainer}
        keyExtractor={({id}) => id}
        renderItem={({item}) => <ArticleListItem data={item} />}
        ItemSeparatorComponent={<View style={styles.spacer} />}
        showsVerticalScrollIndicator={false}
        renderQuickActions={({item}) => <QuickActions id={item.id} />}
        maxSwipeDistance={100}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg.primary,
  },
  listContainer: {
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: color.bg.error,
    paddingVertical: 4,
  },
  errorText: {
    color: color.text.error,
    textAlign: 'center',
  },
  spacer: {
    height: 12,
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionContainer: {
    width: 44,
    aspectRatio: 1,
    justifyContent: 'center',
  },
  actionIconImg: {
    width: 30,
    aspectRatio: 1,
    alignSelf: 'center',
  },
});

export default Home;
