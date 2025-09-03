import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../services/supabaseMock';
import Button from '../components/Button';
import GolfPinIcon from '../components/icons/GolfPinIcon';

const LoginScreen: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const { user, error: apiError } = await auth.login(email);
    if (apiError) {
      setError(apiError);
    } else if (user) {
      login(user);
    }
    setIsLoading(false);
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!fullName || !cpf) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setIsLoading(true);
    setError(null);
    const { user, error: apiError } = await auth.register({ fullName, cpf, email });
    if (apiError) {
        setError(apiError);
    } else if (user) {
        login(user);
    }
    setIsLoading(false);
  };

  const handlePresetLogin = (presetEmail: string) => {
    setEmail(presetEmail);
    setPassword('password');
    setIsRegistering(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
            <GolfPinIcon className="mx-auto h-12 w-12 text-green-400" />
            <h2 className="mt-6 text-3xl font-extrabold text-white">
                {isRegistering ? 'Crie sua Conta' : 'Acesse o Pine Hill Score'}
            </h2>
        </div>
        <form className="mt-8 space-y-4" onSubmit={isRegistering ? handleRegister : handleLogin}>
            {isRegistering && (
                 <>
                    <input
                        id="full-name"
                        name="fullName"
                        type="text"
                        required
                        className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        placeholder="Nome Completo"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                     <input
                        id="cpf"
                        name="cpf"
                        type="text"
                        required
                        className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                      />
                 </>
            )}

            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              placeholder="Endereço de e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <div>
            <Button type="submit" className="w-full" isLoading={isLoading}>
              {isRegistering ? 'Cadastrar' : 'Entrar'}
            </Button>
          </div>
        </form>
         <div className="text-center text-sm">
             <button onClick={() => { setIsRegistering(!isRegistering); setError(null); }} className="font-medium text-green-400 hover:text-green-300">
                {isRegistering ? 'Já tem uma conta? Faça o login' : 'Não tem uma conta? Cadastre-se'}
            </button>
        </div>
         <div className="text-center text-sm text-gray-400 pt-4 border-t border-gray-700">
            <p className="font-semibold">Ou use uma conta de demonstração:</p>
            <div className="flex justify-center space-x-2 mt-2">
                 <button onClick={() => handlePresetLogin('admin@pinehillscore.com')} className="underline hover:text-green-400">Admin</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;