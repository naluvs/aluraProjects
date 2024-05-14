import { renderHook } from '@testing-library/react';
import { useEffect, useState } from 'react';

test('Hooks', () => {
  const { result } = renderHook(() => {
    const [nome, setNome] = useState('');
    useEffect(() => {
      setNome('Alice');
    }, []);

    return nome;
  });

  expect(result.current).toBe('Alice');
});
