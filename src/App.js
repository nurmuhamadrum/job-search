import { ChakraProvider } from '@chakra-ui/react';
import HomeScreen from './Screens/HomeScreen';

function App() {
  return (
    <ChakraProvider>
      <HomeScreen />
    </ChakraProvider>
  );
}

export default App;
