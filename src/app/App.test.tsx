import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders the Brupress shell', () => {
    render(<App />);

    expect(screen.getByText('Brupress')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Registrar pressao' }),
    ).toBeInTheDocument();
  });

  it('navigates between the main screens', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Ver historico' }));
    expect(screen.getByRole('heading', { name: 'Historico' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Voltar' }));
    await user.click(screen.getByRole('button', { name: 'Registrar pressao' }));

    expect(
      screen.getByRole('heading', { name: 'Registrar pressao' }),
    ).toBeInTheDocument();
  });
});
