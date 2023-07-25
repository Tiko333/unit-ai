import * as dotenv from 'dotenv';
if (process.env.NODE_ENV === 'development') {
    dotenv.config();
}

import { App } from './app';
import { Container } from './container';

(async () => {
    await App.main(new Container());
})();
