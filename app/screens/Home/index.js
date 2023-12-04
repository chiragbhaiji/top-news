import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BackgroundFetch from 'react-native-background-fetch';

import {store} from '../../services/Store';
import {fetchNewsArticles} from '../../apis/fetchNewsArticles';
import {useArticles} from '../../hooks/useArticles';
import {ArticleListItem} from '../../components/ArticleListItem';

const Home = () => {
  const {articles, isLoading, isError} = useArticles();

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

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {'Something went wrong!\nUnable to fetch latest news'}
          </Text>
        </View>
      )}
      <FlatList
        data={articles}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => <ArticleListItem data={item} />}
        ItemSeparatorComponent={<View style={styles.spacer} />}
        showsVerticalScrollIndicator={false}
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
});

export default Home;
