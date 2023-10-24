import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,AsyncStorage } from 'react-native';
import { AsyncStorage } from 'react-native';


const STORAGE_KEY = 'bitcoinData'; // Unique key to store data in AsyncStorage

function App() {
  const [bitcoinData, setBitcoinData] = useState([]);

  useEffect(() => {
    // Check if the data exists in AsyncStorage
    AsyncStorage.getItem(STORAGE_KEY).then((storedData) => {
      if (storedData) {
        // Data exists locally, parse and set it
        setBitcoinData(JSON.parse(storedData));
      } else {
        // Data doesn't exist locally, fetch and save it
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
          .then((response) => response.json())
          .then((data) => {
            const bitcoinData = data.bpi;
            setBitcoinData(bitcoinData);
            // Save the data in AsyncStorage for future use
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bitcoinData));
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    });
  }, []);

  return (
    <View>
      <Text>Bitcoin Price Index (USD)</Text>
      <FlatList
        data={Object.entries(bitcoinData)}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <View>
            <Text>{item[1].code}: {item[1].rate}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default App;