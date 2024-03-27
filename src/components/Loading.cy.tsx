import React from 'react';
import { Loading } from './Loading';

describe('<Loading />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <div style={{ height: '100vh', display: 'flex' }}>
        <Loading />
      </div>,
    );
  });
});
