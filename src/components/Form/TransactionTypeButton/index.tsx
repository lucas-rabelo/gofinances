import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
    Container,
    Icon,
    Title,
    Button
} from './styles';

interface Props extends RectButtonProps {
    type: 'up' | 'down';
    title: string;
    isActived: boolean;
    onPress: () => void;
}

const icon = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
}

export function TransactionTypeButton({ type, title, isActived, onPress, ...rest }: Props) {
    return (
        <Container
            isActived={isActived}
            type={type}
        >
            <Button onPress={onPress} {...rest}>
                <Icon name={icon[type]} type={type} />
                <Title isActived={isActived}>
                    {title}
                </Title>
            </Button>
        </Container >
    );
}