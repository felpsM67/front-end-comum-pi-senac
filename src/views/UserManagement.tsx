// src/views/UserManagement.tsx
import withPageLayout from '../hoc/withPageLayout';
import UserManagementInner from './UserManagementInner';

const UserManagement = withPageLayout({
  title: 'Gestão de usuários',
  subtitle: 'Visualize, busque, crie e edite usuários da aplicação.',
})(UserManagementInner);

export default UserManagement;
