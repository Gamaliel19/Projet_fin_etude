import 'swiper/swiper-bundle.css'
import { CSSReset, ColorModeProvider, ThemeProvider } from '@chakra-ui/react'
import Router from './Router';
import theme2 from './Components/Theme';

function App() {
  return (
    <ThemeProvider theme={theme2}>
      <ColorModeProvider>
        <CSSReset />
        <Router />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
