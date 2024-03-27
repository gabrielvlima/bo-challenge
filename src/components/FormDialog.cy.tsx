import { FormDialog } from './FormDialog';

const handle = () => {};

describe('<FormDialog />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <FormDialog open={true} onClose={handle} title={'Modal'}>
        <p>Hello, this is a modal</p>
      </FormDialog>,
    );
  });
});
