import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// import './index.css';

// Нормалізація стилів
import 'modern-normalize';

// Глобальні стилі (додатково)
import './global.css';

import ModuleBar from './components/ModuleBar/ModuleBar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModuleBar />
  </StrictMode>,
);
