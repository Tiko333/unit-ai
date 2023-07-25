import * as express from 'express';
import { AwilixContainer } from 'awilix';
import { UnitAiRoutes } from "./unit-ai.routes";

export class BootstrapRoutes {
    private readonly router: express.Router;
    private readonly unitAiRoutes: UnitAiRoutes;

    constructor() {
        this.router = express.Router();
        this.unitAiRoutes = new UnitAiRoutes();
    }

    init(container: AwilixContainer): express.Router {
        this.router.use(this.unitAiRoutes.bootstrapUnitAiRoutes(container));

        return this.router;
    }
}
