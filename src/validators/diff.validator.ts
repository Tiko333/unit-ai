import { NextFunction } from 'express';
import { Configs } from '../configs/configs';

export = class DiffValidator {
    async validate(req, res, next: NextFunction): Promise<void> {
        if (
            req.body.head_commit?.message === Configs.COMMIT_MESSAGE ||
            !req.body?.head?.ref ||
            !req.body?.pull_request?.diff_url
        ) {
            return res.send({
                status: 'error',
            });
        }

        next();
    }
};
