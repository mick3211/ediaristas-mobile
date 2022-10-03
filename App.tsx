import { MainProvider } from 'data/contexts/MainContext';
import 'data/services/RNEnv';
import 'data/services/RNPolyfills';
import { Router } from 'ui/router/Router';
import { ThemeProvider } from 'ui/themes/ThemeProvider';

export default function App() {
    return (
        <MainProvider>
            <ThemeProvider>
                <Router />
            </ThemeProvider>
        </MainProvider>
    );
}
