import { useNavigate } from 'react-router';
import { LoginForm } from '../components/LoginForm';
import { Layout } from '../components/Layout';

export const Login = () => {
  const navigate = useNavigate();
  return (
    <Layout title="Log In">
      <LoginForm onSuccess={() => navigate('/app')} />
    </Layout>
  );
};
