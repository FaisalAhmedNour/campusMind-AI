import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1a237e', // Deep Navy
            light: '#534bae',
            dark: '#000051',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ffd700', // Gold
            light: '#ffff52',
            dark: '#c7a500',
            contrastText: '#000000',
        },
        background: {
            default: 'transparent', // Handled by CSS gradient
            paper: 'rgba(255, 255, 255, 0.9)',
        },
    },
    typography: {
        fontFamily: '"Outfit", "Inter", "Roboto", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h4: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(45deg, #1a237e 30%, #283593 90%)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    borderRadius: 16,
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(26, 35, 126, 0.8)',
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                },
            },
        },
    },
});

export default theme;
