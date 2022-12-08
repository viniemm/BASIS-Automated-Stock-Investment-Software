import { PaletteMode, SxProps, Theme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const COLORS = {
    light: '#fcfcfc',
    dark: '#202020',
    bluePrimary: '#b0efef',
    greenPrimary: '#e2f9db',
    greenDarker: '#c3eac4',
    greenDarkest: '#addfad',
    blueDarkest: '#00d1d4'
}

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: COLORS.dark
          },
          divider: COLORS.greenDarker,
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
          background: {
            default: COLORS.greenPrimary,
            paper: COLORS.greenDarker,
          }
        }
      : {
          // palette values for dark mode
          primary: {
            main: COLORS.light
          },
          divider: COLORS.light,
          background: {
            default: COLORS.dark,
            paper: grey[700],
          },
          text: {
            primary: COLORS.bluePrimary,
            secondary: COLORS.light,
          },
      }),
    },
  });

export const NavBarSX:SxProps<Theme> = {
    padding: '0.5rem 2.3rem',
    fontSize: 'larger',
    fontWeight: 300,
    color: 'inherit',
    dislay: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}