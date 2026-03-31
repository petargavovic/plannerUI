import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

type Props = {
  onSwitchToRegister: () => void;
};

export default function LoginPage({ onSwitchToRegister }: Props) {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError('Login failed. Check credentials.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 420, margin: '0 auto' }}>
      <h1>Login</h1>
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

        {error ? <div style={{ color: 'red' }}>{error}</div> : null}

        <button type="submit" style={{ padding: '10px 16px' }} disabled={loading}>
          {loading ? 'Logging in…' : 'Login'}
        </button>

        <button type="button" onClick={onSwitchToRegister} style={{ padding: '10px 16px' }}>
          Register
        </button>
      </form>
    </div>
  );
}
