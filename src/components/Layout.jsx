import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '../components/AppBar/AppBar';

export default function Layout() {
  return (
    <>
      <AppBar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
}