import * as express from 'express';
import * as core from 'express-serve-static-core';

import { Container } from './container';
import { Configs } from './configs/configs';
import { BootstrapRoutes } from './routes/bootstrap.routes';

export class App {
    static async main(container: Container): Promise<void> {
        const app: core.Express = express();

        app.use(express.json());

        container.init();

        const routes: BootstrapRoutes = new BootstrapRoutes();
        app.use(routes.init(container.registry));

        app.listen(Configs.PORT, () => {
            console.log(`Server listening on port: ${Configs.PORT}`);
        });
    }
}
