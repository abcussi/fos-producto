'use client';

import React, { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '../Buttons/Button/Button';
import { useAuth } from '@/app/context/authContext';
import { Plus } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <header className="bg-condatyHeader shadow-md py-4 w-full">
      <nav className="container mx-auto px-4 max-w-[1400px]">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="text-2xl font-bold text-condatyGreen">
              Test Condaty
            </div>
          </Link>

          {!isAuthenticated ? (
            <Button onClick={handleLoginClick}>
              Iniciar Sesión
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button onClick={logout} variant="warn">
                Cerrar Sesión
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;