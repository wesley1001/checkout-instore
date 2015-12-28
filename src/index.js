import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import routes from './routes';

const container = document.getElementById('app-container');

render(<Router>{routes}</Router>, container);
