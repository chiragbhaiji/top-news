# TopNews | React Native Mobile App

### About

A dynamic news app that fetches the top 100 headlines, stores them for offline access and provides an interactive list view for a seamless user experience.

### Prerequisite

[React Native Development Environment Setup](https://reactnative.dev/docs/environment-setup)

### Project Setup

- Clone the repository
- Install dependencies using `yarn install`

> Running on iOS [Minimum iOS version supported: 12.4]

- Run `npx pod-install`
- Run `yarn ios`

> Running on Android [Minimum Android version supported: Android 5.0 (API level 21)]

- Run `yarn android`

### Assumptions

- Consistent Internet Connection: Users have a stable Internet connection during the initial fetch of headlines.
- Handling Exhaustion: On exhausting the current batch of headlines, the app overwrites the old batch with the new one.
- Deletion/Pinning: Deletion and pinning of headlines currently occur in-memory only, offline storage is not updated.

### Known Issues

- Unpinning a headline does not auto-close the swipe actions.
- Action icons on headlines appear blurred.
- The splash screen does not show the intended background colour on Android.

### Improvements

- Implement caching of images using [react-native-fast-image](https://www.npmjs.com/package/react-native-fast-image).
- Use SVG icons for better quality.
- Explore better libraries or utilise [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) library to implement swipe to action feature.
- Implement error boundary.

### Features covered

- Fetches and stores top news headlines from an external API. It also runs in the background at intervals of the day.
- Displays a dynamic list of headlines with periodic updates.
- The user can fetch the new batch manually, which resets the timer.
- User interaction: Swipe to delete or pin headlines.
- Storage reset upon displaying all headlines from a batch and fetching new one.

### Demo and APK

- [APK link](https://i.diawi.com/WvsJkj)
- [Walkthrough video](https://github.com/chiragbhaiji/top-news/assets/27726339/e5c0c049-8df1-418b-a7b9-9c5b8eae9630)

> Screenshots

<img width="320" src="https://github.com/chiragbhaiji/top-news/assets/27726339/2fc36f71-7a66-4de3-857b-bd072fa9657c">
<img width="320" src="https://github.com/chiragbhaiji/top-news/assets/27726339/aabc26e8-7500-4511-b45a-38561e7e7327">
<img width="320" src="https://github.com/chiragbhaiji/top-news/assets/27726339/35ca3bf1-dacb-4541-be60-1e1867779d75">
