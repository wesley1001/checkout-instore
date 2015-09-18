import React from 'react';
import routes from './routes';
import { create } from 'react-router';

const router = create({routes});
const container = document.getElementById('app-container');

router.run((Handler) => React.render((<Handler/>), container));
