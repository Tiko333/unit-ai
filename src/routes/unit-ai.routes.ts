import * as express from 'express';
import { AwilixContainer } from 'awilix';

import UnitAiCtrl from '../controllers/unit-ai.ctrl';
import { asyncMethodHandler } from '../utilities/async-method-handler';
import DiffValidator from '../validators/diff.validator';

export class UnitAiRoutes {
    private readonly emailRouter: express.Router;

    constructor() {
        this.emailRouter = express.Router();
    }

    bootstrapUnitAiRoutes(container: AwilixContainer): express.Router {
        const unitAiCtrl: UnitAiCtrl = container.resolve<UnitAiCtrl>('unitAiCtrl');
        const diffValidator: DiffValidator = container.resolve<DiffValidator>('diffValidator');

        this.emailRouter.post(
            '/diff',
            asyncMethodHandler(diffValidator.validate, diffValidator),
            asyncMethodHandler(unitAiCtrl.pushCommit, unitAiCtrl)
        );

        return this.emailRouter;
    }
}
