import { extendTheme } from '@chakra-ui/react';

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
});
