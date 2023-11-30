import 'swiper/swiper-bundle.css'
import { CSSReset, ColorModeProvider, ThemeProvider, theme } from '@chakra-ui/react'
import Router from './Router';
import Navbar from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Navbar />
        <Router />
        <Footer/>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
