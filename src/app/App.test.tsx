import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders the Brupress shell', () => {
    render(<App />);

    expect(screen.getByText('Brupress')).toBeInTheDocument();
    expect(screen.getByText(/Cuidado diario/i)).toBeInTheDocument();
  });
});
