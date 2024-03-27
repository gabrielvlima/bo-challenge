import { Card } from './Card';
import { User } from '../context/UserContext';

const handle = () => console.log('click');
const user: User = {
  id: 1,
  email: 'email@email.com',
  first_name: 'Nome',
  last_name: 'Sobrenome',
  avatar: '',
};

describe('<Card />', () => {
  it('renders', () => {
    cy.mount(<Card user={user} onDelete={handle} onEdit={handle} />);
  });
});
