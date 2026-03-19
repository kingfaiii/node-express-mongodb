import apiClient from '../../api/client';
import Form from '../Form';

export default function RegisterForm() {

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        apiClient.post('/users/register', {
            // Collect form data and send to backend
        }).then(response => {
            // Handle successful registration
        });

    };
  return (
    <Form
      title="Register"
      onSubmit={handleSubmit}
      error={error}
      footerText="Already have an Account?"
      footerLink="/login"
      footerLinkText="Sign in"
    ></Form>
  );
}
