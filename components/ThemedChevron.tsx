import { Text, type TextProps, StyleSheet } from 'react-native';
import { ChevronRight, type IconProps, XLg } from 'react-bootstrap-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SVGAttributes } from 'react';

export type ThemedChevronProps = IconProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedChevron({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedChevronProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
   // console.log(color);
    <ChevronRight
      style={{color, fontSize:22}}
      
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  subdued:{
    fontSize:10,
    lineHeight:20
  }
});
