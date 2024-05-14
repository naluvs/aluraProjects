import api from './api';
import { buscaSaldo } from './saldo';
import { buscaTransacoes, salvaTransacao } from './transacoes';

jest.mock('./api');
const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'Novembro',
  },
];

const mockSaldo = {
  valor: '150',
};

const mockRequisicaoPost = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 201,
      });
    }, 200);
  });
};

const mockRequisicaoPostErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

const mockRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: retorno,
      });
    }, 200);
  });
};
const mockRequisicaoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

beforeEach(() => {
  api.get.mockClear();
});

describe('Requisições para API', () => {
  test('Deve retornar uma lista de transações', async () => {
    api.get.mockImplementation(() => mockRequisicao(mockTransacao));
    const transacoes = await buscaTransacoes();
    expect(transacoes).toEqual(mockTransacao);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  test('Deve retornar uma lista vazia quando a requisição falhar', async () => {
    api.get.mockImplementation(() => mockRequisicaoErro());

    const transacoes = await buscaTransacoes();
    expect(transacoes).toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  test('Deve criar uma nova transação', async () => {
    api.post.mockImplementation(() => mockRequisicaoPost());
    const status = await salvaTransacao(mockTransacao[0]);
    expect(status).toBe(201);
    expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0]);
  });

  test('Deve retornar mensagem de erro quando a requisição POST falhar', async () => {
    api.post.mockImplementation(() => mockRequisicaoPostErro());
    const status = await salvaTransacao(mockTransacao[0]);
    expect(status).toBe('Erro na requisição');
    expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0]);
  });

  test('Deve retornar um objeto de saldo', async () => {
    api.get.mockImplementation(() => mockRequisicao(mockSaldo));

    const saldo = await buscaSaldo();
    expect(saldo).toEqual(mockSaldo.valor);
    expect(api.get).toHaveBeenCalledWith('/saldo');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar o saldo de 1000', async () => {
    api.get.mockImplementation(() => mockRequisicaoErro());
    const saldo = await buscaSaldo();

    expect(saldo).toEqual(1000);
    expect(api.get).toHaveBeenCalledWith('/saldo');
    expect(api.get).toHaveBeenCalledTimes(1);
  });
});
