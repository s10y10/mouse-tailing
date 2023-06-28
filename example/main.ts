import './style.css';

import { createMouseTailing } from '../lib';

// import { createMouseTailing } from 'mouse-tailing';

// createMouseTailing({ type: 'sky', el: '.container-sky' });
// createMouseTailing({ type: 'star', el: '.container-star' });

const t = createMouseTailing({ type: 'heart', count: 1, color: '#ffff00' });
// setTimeout(() => {
//   t.destroy();
// }, 5e3);
