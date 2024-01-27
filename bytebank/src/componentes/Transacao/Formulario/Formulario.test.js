import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Formulario from '.';

describe('Deve renderizar um campo de input', () => {
  test('no documento', () => {
    render(<Formulario />);
    const campoTexto = screen.getByPlaceholderText('Digite um valor');
    expect(campoTexto).toBeInTheDocument();
  });

  test('do tipo number', () => {
    render(<Formulario />);
    const campoTexto = screen.getByPlaceholderText('Digite um valor');
    expect(campoTexto).toHaveAttribute('type', 'number');
  });

  test('que pode ser preenchido', () => {
    render(<Formulario />);
    const campoTexto = screen.getByPlaceholderText('Digite um valor');
    userEvent.type(campoTexto, '50');
    expect(campoTexto).toHaveValue(50);
  });
});

test('Deve selecionar o tipo de transação que o usuário clicar', () => {
  render(<Formulario />);
  const opcoes = screen.getByTestId('select-opcoes');
  userEvent.selectOptions(opcoes, ['Transferência']);
  expect(screen.getByRole('option', { name: 'Transferência' }).selected).toBe(
    true
  );
  expect(screen.getByRole('option', { name: 'Depósito' }).selected).toBe(false);
});

test('Deve chamar um evento de onSubmit ao clicar em realizar transação', () => {
  const realizarTransacao = jest.fn(); // .fn() faz um mock da função
  render(<Formulario realizarTransacao={realizarTransacao} />);
  const botao = screen.getByRole('button');
  userEvent.click(botao);
  expect(realizarTransacao).toHaveBeenCalledTimes(1);
});
