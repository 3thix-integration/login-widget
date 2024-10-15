import { createContext } from 'react';

export type ThemeProps = {
  TextColor: string;
  LinkColor: string;
  CardBackground: string;
  ButtonBackground: string;
  ButtonTextColor: string;
  InputLabelColor: string;
  InputTextColor: string;
  InputBackground: string;
  InputBorderColor: string;
};

export const defaultTheme: ThemeProps = {
  TextColor: '#FFFFFF',
  LinkColor: '#9190C2',
  CardBackground: '#00002D',
  ButtonBackground: '#24D07E',
  ButtonTextColor: '#FFFFFF',
  InputLabelColor: '#68679D',
  InputTextColor: '#EEEEEE',
  InputBackground: '#181745',
  InputBorderColor: '#181745',
};

export const ThemeContext = createContext<ThemeProps>(defaultTheme);
