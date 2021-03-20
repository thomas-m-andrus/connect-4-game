import React from 'react';
import { render } from '@testing-library/react';

import FourByFourGame from './four-by-four-game';

describe('FourByFourGame', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FourByFourGame />);
    expect(baseElement).toBeTruthy();
  });
});
