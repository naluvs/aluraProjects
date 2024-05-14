import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from 'routes';
import App from './App';
describe('Componente <App/>', () => {
  test('Deve permitir adicionar uma transação no Extrato', () => {
    render(<App />, { wrapper: BrowserRouter });

    const select = screen.getByRole('combobox');
    const campoValor = screen.getByPlaceholderText('Digite um valor');
    const botao = screen.getByRole('button');

    userEvent.selectOptions(select, ['Depósito']);
    userEvent.type(campoValor, '100');
    userEvent.click(botao);

    const novaTransacao = screen.getByTestId('lista-transacoes');
    const itemExtrato = screen.getByRole('listitem');
    expect(novaTransacao).toContainElement(itemExtrato);
  });

  test('Deve navegar até a página de cartões ao clicar no link que leva até ela', async () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });

    const linkPaginaCartoes = screen.getByText('Cartões');
    expect(linkPaginaCartoes).toBeInTheDocument();

    userEvent.click(linkPaginaCartoes);
    const tituloPaginaCartoes = await screen.findByText('Meus cartões');
    expect(tituloPaginaCartoes).toBeInTheDocument();
  });

  test('Deve navegar até a página de Investimentos ao clicar no link que leva até ela', async () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });

    const linkPaginaInvestimentos = screen.getByText('Investimentos');
    userEvent.click(linkPaginaInvestimentos);

    const tituloPaginaInvestimento = await screen.findByText('Renda Fixa');
    expect(tituloPaginaInvestimento).toBeInTheDocument();
  });
});
