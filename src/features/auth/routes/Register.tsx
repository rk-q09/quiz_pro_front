import { useNavigate } from 'react-router';
import { RegisterForm } from '../components/RegisterForm';
import { Layout } from '../components/Layout';

export const Register = () => {
  const navigate = useNavigate();
  return (
    <Layout title="Sign Up">
      <RegisterForm onSuccess={() => navigate('/')} />
    </Layout>
  );
};
