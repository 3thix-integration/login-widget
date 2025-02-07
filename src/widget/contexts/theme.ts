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
  TextColor: '#F8F8F8',
  LinkColor: '#cdcfd2',
  CardBackground: '#1F2A39',
  ButtonBackground: '#78F0A0',
  ButtonTextColor: '#1F2A39',
  InputLabelColor: '#F8F8F8',
  InputTextColor: '#EEEEEE',
  InputBackground: '#4b5561',
  InputBorderColor: '#4b5561',
};

export const ThemeContext = createContext<ThemeProps>(defaultTheme);
