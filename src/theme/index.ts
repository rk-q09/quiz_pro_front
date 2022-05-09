import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import Container from './components/container';

const breakpoints = createBreakpoints({
  sm: '599px',
  md: '1024px',
  lg: '1260px',
  xl: '1560px',
});

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'primary.900',
      },
    },
  },
  fonts: {
    body: `"Noto Sans, Noto Sans JP"`,
    heading: `"Noto Sans, Noto Sans JP"`,
  },
  colors: {
    primary: {
      500: '#273568',
      600: '#262E49',
      800: '#212941',
      900: '#1D243D',
    },
  },
  components: {
    Container,
  },
  breakpoints,
});
