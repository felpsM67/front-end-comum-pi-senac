import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../views/Login';
import Home from '../views/Home';
import UserManagement from '../views/UserManagement';
import UserForm from '../views/UserForm';
import ProtectedRoute from '../ProtectedRoute';
import RestrictedLayout from '../layout/RestrictedLayout';
import ShoppingCart from '../components/ShoppingCart';
import HomeCliente from '../components/HomeCliente';
import DetalhesPrato from '../components/DetalhesPrato';
import FormularioPrato from '../components/FormularioPrato';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: 'cardapio',
    element: <HomeCliente />,
  },
  {
    path: '/detalhes/:id',
    element: <DetalhesPrato />,
  },
  {
    path: '/novo-prato',
    element: <FormularioPrato />,
  },
  {
    path: '/carrinho',
    element: <ShoppingCart />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <RestrictedLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to="/home" replace />,
          },
          {
            path: '/home',
            element: <Home />,
          },
          {
            path: '/users',
            element: <UserManagement />,
          },
          {
            path: '/users/new',
            element: <UserForm />,
          },
          {
            path: '/users/edit/:id',
            element: <UserForm isEditing />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />,
  },
];

export default routes;
