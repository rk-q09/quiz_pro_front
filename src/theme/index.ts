import { extendTheme } from '@chakra-ui/react';

import Container from './components/container';

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
      300: '#F2F4FF',
      400: '#BDC7FC',
      500: '#4060B8',
      600: '#0D2354',
      700: '#011B3D',
      800: '#001932',
      900: '#001626',
    },
    secondary: {
      200: '#E8FEBC',
      300: '#D9FB85',
      400: '#CBF04D',
      500: '#BBDD18'
    },
    tertiary: {
      100: '#FAFAFC',
      200: '#E5E6EB',
      300: '#D0D2D9',
      400: '#BCC0C7',
      500: '#A8ADB5',
      600: '#868B91',
      700: '#54595E',
      800: '#43474A',
      900: '#222526'
    }
  },
  components: {
    Container,
  },
});
