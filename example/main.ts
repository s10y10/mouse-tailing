import './style.css';
import { createMouseTailing } from '../lib';
// import { createMouseTailing } from 'mouse-tailing';

// createMouseTailing({ type: 'sky', el: '.container-sky' });
// createMouseTailing({ type: 'star', el: '.container-star' });

createMouseTailing({ type: 'sky', color: '#fff000', duration: 2000 });
