import * as React from 'react';

declare module 'react-icons' {
  export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
    children?: React.ReactNode;
    size?: string | number;
    color?: string;
    title?: string;
    className?: string;
    strokeWidth?: number | string;
    style?: React.CSSProperties;
    onClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  }
}

declare module 'react-icons/lib' {
  export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
    children?: React.ReactNode;
    size?: string | number;
    color?: string;
    title?: string;
    className?: string;
    strokeWidth?: number | string;
    style?: React.CSSProperties;
    onClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  }
}
