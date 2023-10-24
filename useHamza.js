import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from the correct library

// ... (rest of the code)

const STORAGE_KEY = 'bitcoinData';

function useHamza() {
  const [bitcoinData, setBitcoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedData) {
          // Data exists locally, parse and set it
          setBitcoinData(JSON.parse(storedData));
        } else {
          // Data doesn't exist locally, fetch and save it
          const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
          const data = await response.json();
          const btcData = data.bpi;
          setBitcoinData(btcData);
          // Save the data in AsyncStorage for future use
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(btcData));
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { bitcoinData, isLoading, error };
}

export default useHamza;
