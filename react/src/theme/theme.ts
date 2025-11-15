// ...existing code will be copied from theme.js...import { createTheme } from '@mui/material/styles'

import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#f288c6',
            main: '#f20a9a',
            dark: '#b50073',
            contrastText: '#FFFFFF',
        },
        secondary: {
            light: '#d7fbf8',
            main: '#04ecdd',
            dark: '#00a689',
            contrastText: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: [
            'Inter',
            'system-ui',
            'Avenir',
            'Helvetica',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
})