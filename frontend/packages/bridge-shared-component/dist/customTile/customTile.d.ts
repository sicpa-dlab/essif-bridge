import React from 'react';
interface Props {
    header: string;
    content: string;
    logo?: string;
    isExpendable?: boolean;
    disabled?: boolean;
    href?: string;
    handleClick?: () => void;
}
export default class CustomTile extends React.Component<Props> {
    render(): JSX.Element;
}
export declare const Tile: React.FC<Props>;
export {};
