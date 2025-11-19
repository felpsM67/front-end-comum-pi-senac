import React from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../shared/routing/ProtectedRoute';
import DetalhesPrato from '../features/menu/pages/DetalhesPrato';
import FormularioPrato from '../features/admin/pages/PratoFormPage';
import HomeCliente from '../features/menu/pages/HomeCliente';
import ShoppingCart from '../features/cart/pages/ShoppingCart';
import PublicLayout from '../shared/layout/PublicLayout';
import RestrictedLayout from '../features/admin/layout/RestrictedLayout';
import Home from '../features/admin/pages/AdminHomePage';
import Login from '../features/auth/components/Login';
import OrderManagement from '../features/admin/pages/OrderManagementPage';
import UserForm from '../features/admin/components/UserForm';
import UserManagement from '../features/admin/pages/UserManagementPage';
import OrderForm from '../features/admin/components/orderForm';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

const ClienteLogin = () => <div>Cliente Login Page</div>; // Placeholder component

const routes: RouteConfig[] = [
  {
    path: '/login-admin',
    element: <Login />,
  },
  {
    path: '/login',
    element: <ClienteLogin />,
  },
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: '',
        element: <HomeCliente />,
      },
      {
        path: 'detalhes/:id',
        element: <DetalhesPrato />,
      },
      {
        path: 'carrinho',
        element: <ShoppingCart />,
      },
    ],
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <RestrictedLayout />,
        children: [
          {
            path: '',
            element: <Navigate to="home" replace />,
          },
          {
            path: 'novo-prato',
            element: <FormularioPrato />,
          },
          {
            path: 'detalhes-prato/:id',
            element: <FormularioPrato />,
          },
          {
            path: 'home',
            element: <Home />,
          },
          {
            path: 'usuarios',
            element: <UserManagement />,
          },
          {
            path: 'usuarios/novo',
            element: <UserForm />,
          },
          {
            path: 'usuarios/editar/:id',
            element: <UserForm isEditing />,
          },
          {
            path: 'pedidos',
            element: <OrderManagement />,
          },
          {
            path: 'pedidos/novo',
            element: <OrderForm />,
          },
          {
            path: 'pedidos/editar/:id',
            element: <OrderForm />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
