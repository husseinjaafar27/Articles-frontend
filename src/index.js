import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWrapper from './AppWrapper';
import {AppRouter} from './Router/AppRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppWrapper>
      <AppRouter />
    </AppWrapper>
);

