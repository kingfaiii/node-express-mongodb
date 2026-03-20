import { User, Mail, Calendar, Lock } from 'lucide-react'; // 2. Visual Hierarchy
import Form from '../Form';
import Fieldtemp from '../Fieldtemp';
import Button from '../Button';
import { useRegister } from '../../features/auth/useRegister';
export default function RegisterForm() {
  const { formData, handleChange, register, loading, errors } = useRegister();

  return (
    <Form
      title="Create Account"
      onSubmit={register}
      error={errors.global}
      footerText="Already have an Account?"
      footerLink="/login"
      footerLinkText="Sign in"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Fieldtemp
          label="First Name"
          name="firstName"
          value={formData.firstName}
          error={errors.firstName}
          onChange={handleChange}
          icon={User}
        />
        <Fieldtemp
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          error={errors.lastName}
          onChange={handleChange}
          icon={User}
        />
      </div>

      <Fieldtemp
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        error={errors.email}
        onChange={handleChange}
        icon={Mail}
      />

      <Fieldtemp
        label="Birthday"
        type="date"
        name="birthDay"
        value={formData.birthDay}
        error={errors.birthDay}
        onChange={handleChange}
        icon={Calendar}
      />

      <Fieldtemp
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        error={errors.password}
        onChange={handleChange}
        icon={Lock}
      />

      <Button type="submit" isLoading={loading}>
        Create Account
      </Button>
    </Form>
  );
}
