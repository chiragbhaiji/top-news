import React, {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';
import BackgroundFetch from 'react-native-background-fetch';

import {store} from './services/Store';
import Home from './screens/Home';

const App = () => {
  useEffect(() => {
    initBackgroundFetch();
    SplashScreen.hide();
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

  return <Home />;
};

export default App;
