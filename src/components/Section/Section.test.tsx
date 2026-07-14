import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Section from './Section';

describe('Section', () => {
  it('renders its children and applies the given id', () => {
    render(
      <Section id="main" className="custom-class">
        <p>Content</p>
      </Section>,
    );

    expect(screen.getByText('Content')).toBeInTheDocument();

    const section = document.getElementById('main');
    expect(section).not.toBeNull();
    expect(section).toHaveClass('custom-class');
  });
});
