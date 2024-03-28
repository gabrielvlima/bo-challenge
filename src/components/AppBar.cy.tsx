import { AppBar } from './AppBar';

describe('<AppBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AppBar />);
  });
});
