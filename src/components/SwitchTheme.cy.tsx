import { SwitchTheme } from './SwitchTheme';

describe('<SwitchTheme />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SwitchTheme />);
  });
});
