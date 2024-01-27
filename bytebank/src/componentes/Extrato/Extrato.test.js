import { render, screen } from '@testing-library/react';
import Extrato from './index';

describe('Deve renderizar um extrato', () => {
  test('Deve renderizar uma lista de transações', () => {
    const transacoes = [
      {
        transacao: 'Depósito',
        valor: 100
      }
    ];
    render(<Extrato transacoes={transacoes} />);
    const lista = screen.getByRole('list');
    expect(lista).toBeInTheDocument();
  });
});
