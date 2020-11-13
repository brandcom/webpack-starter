import './scss/styles.scss';

import print from './js/print';

requireAll(require.context('./img/sprites/', true, /\.svg$/));
print();

function requireAll(r) {
    r.keys().forEach(r);
}
