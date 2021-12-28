import React, { useState } from 'react';
import {
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles';

type FormData = {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    amount: Yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo').required('O valor é obrigatório')
});

export function Register() {

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    function handleRegister(form: FormData) {
        if (!transactionType) {
            Alert.alert('Aviso', 'Selecione o tipo da transação');
            return;
        }

        if (category.key === 'category') {
            Alert.alert('Aviso', 'Selecione uma categoria');
            return;
        }

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.name
        }

        console.log(data);
    }

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            control={control}
                            name="name"
                            error={errors.name && errors.name.message}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                        />
                        <InputForm
                            control={control}
                            name="amount"
                            error={errors.amount && errors.amount.message}
                            placeholder="Preço"
                            keyboardType="numeric"

                        />
                        <TransactionsTypes>
                            <TransactionTypeButton
                                type="up"
                                title="Income"
                                onPress={() => handleTransactionTypeSelect('up')}
                                isActived={transactionType === 'up'}
                            />
                            <TransactionTypeButton
                                type="down"
                                title="Outcome"
                                onPress={() => handleTransactionTypeSelect('down')}
                                isActived={transactionType === 'down'}
                            />
                        </TransactionsTypes>
                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>
                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal
                    visible={categoryModalOpen}
                >
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}