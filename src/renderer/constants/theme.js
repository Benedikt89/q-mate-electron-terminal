import { createTheming } from '@callstack/react-theme-provider';
import Keys from "./appKeys";

const { ThemeProvider, withTheme, useTheme } = createTheming({
  primaryColor: Keys.primaryColor || '#e3bb4d',
  secondaryColor: Keys.secondaryColor || '#000000',
  backgroundColor: Keys.backgroundColor || '#FFFFFF',
  secondaryBackground: Keys.secondaryBackground || '#FDFDFD',
  borderColor: Keys.borderColor || '#b5b5b5',
});

export { ThemeProvider, withTheme, useTheme };