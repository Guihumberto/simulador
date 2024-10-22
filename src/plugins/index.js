/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import money from 'v-money3';

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(money, {
      precision: 2, // Definindo precisão decimal
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
    });
}
