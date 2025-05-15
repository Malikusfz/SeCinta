import { extendTheme } from '@chakra-ui/react';

// SeCinta romantic theme with pastel pink, cream, and gold
const theme = extendTheme({
  colors: {
    brand: {
      pink: "#F8C8DC", // Pastel pink
      cream: "#FFF6E9", // Cream
      gold: "#DAA520", // Gold
      darkPink: "#E5A0B7", // Darker pink for hover states
      lightCream: "#FFFBF5", // Lighter cream for backgrounds
    },
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Lora', serif",
  },
  styles: {
    global: {
      body: {
        bg: 'brand.cream',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.pink',
          color: 'gray.800',
          _hover: {
            bg: 'brand.darkPink',
          },
        },
        outline: {
          borderColor: 'brand.gold',
          color: 'brand.gold',
          _hover: {
            bg: 'brand.lightCream',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'lg',
          boxShadow: 'md',
        },
      },
    },
  },
});

export default theme;
