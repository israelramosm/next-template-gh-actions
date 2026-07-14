import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PageHeader from './PageHeader';

describe('PageHeader', () => {
  it('renders the provided title inside a heading', () => {
    render(<PageHeader title="Home" />);

    const heading = screen.getByRole('heading', { level: 1, name: 'Home' });
    expect(heading).toBeInTheDocument();
  });
});
