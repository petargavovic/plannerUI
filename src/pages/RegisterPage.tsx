import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

type Props = {
  onSwitchToLogin: () => void;
};

export default function RegisterPage({ onSwitchToLogin }: Props) {
  const { register, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register(email, password, firstName, lastName);
    } catch (err) {
      setError('Registration failed.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 420, margin: '0 auto' }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </label>

        <label>
          First name
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </label>

        <label>
          Last name
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </label>

        {error ? <div style={{ color: 'red' }}>{error}</div> : null}

        <button type="submit" style={{ padding: '10px 16px' }} disabled={loading}>
          {loading ? 'Registering…' : 'Register'}
        </button>

        <button type="button" onClick={onSwitchToLogin} style={{ padding: '10px 16px' }}>
          Back to login
        </button>
      </form>
    </div>
  );
}
