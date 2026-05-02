import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollTo', vi.fn());
  });

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
    expect(window.scrollTo).toHaveBeenLastCalledWith({ left: 0, top: 0 });

    await user.click(screen.getByRole('button', { name: 'Voltar' }));
    expect(window.scrollTo).toHaveBeenLastCalledWith({ left: 0, top: 0 });

    await user.click(screen.getByRole('button', { name: 'Registrar pressao' }));

    expect(
      screen.getByRole('heading', { name: 'Registrar pressao' }),
    ).toBeInTheDocument();
    expect(window.scrollTo).toHaveBeenLastCalledWith({ left: 0, top: 0 });
  });
});
