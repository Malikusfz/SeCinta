import { extendTheme } from '@chakra-ui/theme-utils';

const theme = extendTheme({
    colors: {
        brand: {
            50: '#FFF5F7',
            100: '#FFEBEF',
            200: '#FFDBE3',
            300: '#FFBBC9',
            400: '#FFA3B5',
            500: '#FFC0CB', // pastel pink (primary)
            600: '#FF8DA7',
            700: '#FF6186',
            800: '#FF3366',
            900: '#EB0045',
            primary: '#FFC0CB', // pastel pink
            secondary: '#FFFDD0', // cream
            accent: '#FFD700', // gold
        },
        cream: {
            50: '#FFFFF0',
            100: '#FFFEE6',
            200: '#FFFDD0', // cream
            300: '#FFFAB3',
            400: '#FFF699',
            500: '#FFF380',
        },
        gold: {
            100: '#FFF3CC',
            200: '#FFE799',
            300: '#FFDB66',
            400: '#FFCF33',
            500: '#FFD700', // gold
        },
    },
    fonts: {
        heading: `'Playfair Display', serif`,
        body: `'Lora', serif`,
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'normal',
                borderRadius: 'md',
            },
            variants: {
                solid: {
                    bg: 'brand.500',
                    color: 'white',
                    _hover: {
                        bg: 'brand.600',
                    },
                },
                outline: {
                    borderColor: 'brand.500',
                    color: 'brand.500',
                    _hover: {
                        bg: 'brand.50',
                    },
                },
                secondary: {
                    bg: 'cream.200',
                    color: 'gray.700',
                    _hover: {
                        bg: 'cream.300',
                    },
                },
                accent: {
                    bg: 'gold.500',
                    color: 'white',
                    _hover: {
                        bg: 'gold.400',
                    },
                },
            },
        },
        Card: {
            baseStyle: {
                container: {
                    borderRadius: 'lg',
                    boxShadow: 'lg',
                    overflow: 'hidden',
                },
            },
        },
        Modal: {
            baseStyle: {
                dialog: {
                    borderRadius: 'lg',
                },
            },
        },
    },
    shadows: {
        soft: '0 4px 6px rgba(255, 192, 203, 0.1)',
        medium: '0 6px 12px rgba(255, 192, 203, 0.15)',
        strong: '0 8px 24px rgba(255, 192, 203, 0.2)',
    },
    styles: {
        global: {
            body: {
                bg: 'white',
                color: 'gray.800',
            },
        },
    },
});

export default theme; 