import '@/assets/index.pcss';
import { createApp } from 'vue';
import { registerSW } from 'virtual:pwa-register';
import router from '@/router';
import App from '@/App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowRightToBracket);
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router).mount('#app');
registerSW();
