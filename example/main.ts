import { createGroundEffect, createMouseTailing } from '../lib';
import './style.css';

createMouseTailing({
  type: 'heart',
  count: 1,
  color: '#ffff00',
  el: '.container-star',
});

createGroundEffect({
  type: 'sky',
  count: 1,
  color: '#ffff00',
  el: '.container-sky',
});
