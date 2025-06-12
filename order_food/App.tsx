import React from 'react';
import HomeScreen from './src/screens/home';
import { ModalProvider } from './src/context/ModalContext';

function App(): React.JSX.Element {
    return (
        <ModalProvider>
            <HomeScreen/>
        </ModalProvider>
    );
}

export default App;



