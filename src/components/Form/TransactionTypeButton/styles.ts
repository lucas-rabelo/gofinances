import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

type IconProps = {
    type: 'up' | 'down';
}

type ContainerProps = {
    isActived: boolean;
    type: 'up' | 'down';
}

type TitleProps = {
    isActived: boolean;
}

export const Container = styled(TouchableOpacity) <ContainerProps>`
    width: 48%;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    border-width: ${({ isActived }) => isActived ? 0 : 1.5}px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.text};
    border-radius: 5px;

    padding: 16px;

    ${({ isActived, type }) =>
        isActived && type === 'up' && css`
        background-color: ${({ theme }) => theme.colors.success_light};
    `}

    ${({ isActived, type }) =>
        isActived && type === 'down' && css`
        background-color: ${({ theme }) => theme.colors.attention_light}
    `}
`;

export const Icon = styled(Feather) <IconProps>`
    font-size: ${RFValue(24)}px;
    
    margin-right: 12px;

    color: ${({ theme, type }) =>
        type === 'up' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text<TitleProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    
    color: ${({ isActived, theme }) => isActived ? theme.colors.shape : theme.colors.text};
`;