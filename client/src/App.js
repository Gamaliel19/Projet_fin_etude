import { CSSReset, ColorModeProvider, ThemeProvider, theme } from '@chakra-ui/react'
import Router from './Router';
import Navbar from './Components/Navbar/Navbar';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Navbar />
        <Router />
      </ColorModeProvider>

    </ThemeProvider>
  );
}

export default App;
