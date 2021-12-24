import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
    Container,
    Icon,
    Title
} from './styles';

type Props = TouchableOpacityProps & {
    type: 'up' | 'down';
    title: string;
    isActived: boolean;
}

const icon = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
}

export function TransactionTypeButton({ type, title, isActived, ...rest }: Props) {
    return (
        <Container
            isActived={isActived}
            type={type}
            {...rest}
        >
            <Icon name={icon[type]} type={type} />
            <Title isActived={isActived}>
                {title}
            </Title>
        </Container >
    );
}