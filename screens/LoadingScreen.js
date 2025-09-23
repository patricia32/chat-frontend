import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../utils/styles';


const LoadingScreen = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={colors.purple500} />
      <Text style={styles.loadingText}>Please wait...</Text>
    </View>
  );
};

export default LoadingScreen;


const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: '#F2F4F5', // soft light gray
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

