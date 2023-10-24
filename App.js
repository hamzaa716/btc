import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from the correct library

import useHamza from './useHamza.js'; // Import the custom hook

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 16,
  },
});

function App() {
  const { bitcoinData, isLoading, error } = useHamza(); // Use the custom hook

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bitcoin Price Index (USD)</Text>
      <FlatList
        data={Object.entries(bitcoinData)}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>
              {item[1].code}: {item[1].rate}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

export default App;
