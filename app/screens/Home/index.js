import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BackgroundFetch from 'react-native-background-fetch';
import SwipeableFlatList from 'react-native-swipeable-list';

import {store} from '../../services/Store';
import {fetchNewsArticles} from '../../apis/fetchNewsArticles';
import {useArticles} from '../../hooks/useArticles';
import {ArticleListItem} from '../../components/ArticleListItem';
import {Header} from '../../components/Header';

const refreshIcon = require('../../assets/icons/refresh/refresh.png');
const deleteIcon = require('../../assets/icons/delete/delete.png');
const pinIcon = require('../../assets/icons/pin/pin.png');

const Home = () => {
  const {articles, isLoading, isError, manualFetch} = useArticles();

  useEffect(() => {
    initBackgroundFetch();
  }, []);

  const initBackgroundFetch = async () => {
    const onEvent = async taskId => {
      // Fetch the latest news in the background and
      // Store it for offline access
      store.sync(fetchNewsArticles(), () => {
        BackgroundFetch.finish(taskId);
      });
    };

    const onTimeout = taskId => {
      BackgroundFetch.finish(taskId);
    };

    await BackgroundFetch.configure(
      {minimumFetchInterval: 60 * 24},
      onEvent,
      onTimeout,
    );
  };

  const QuickActions = ({qaItem}) => {
    return (
      <View style={styles.actionsContainer}>
        <Pressable style={styles.actionContainer} onPress={() => alert('here')}>
          <Image style={styles.actionIconImg} source={deleteIcon} />
        </Pressable>
        <Pressable style={styles.actionContainer} onPress={() => alert('here')}>
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
        renderQuickActions={({item}) => <QuickActions qaItem={item} />}
        maxSwipeDistance={100}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#F88379',
    paddingVertical: 4,
  },
  errorText: {
    color: 'white',
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
