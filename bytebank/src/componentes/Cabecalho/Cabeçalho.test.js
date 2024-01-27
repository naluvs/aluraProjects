import { render, screen } from '@testing-library/react';
import Cabecalho from './index';

test('Deve renderizar o nome do usuário logado', () => {
  render(<Cabecalho />);
  const username = screen.getByText('Joana Fonseca Gomes');
  expect(username).toBeInTheDocument();
});
