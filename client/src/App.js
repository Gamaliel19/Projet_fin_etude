import 'swiper/swiper-bundle.css'
import { CSSReset, ColorModeProvider, ThemeProvider, theme, useColorModeValue } from '@chakra-ui/react'
import Router from './Router';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Router/>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
