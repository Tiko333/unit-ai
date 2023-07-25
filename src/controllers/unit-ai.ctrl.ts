import { Request, Response } from 'express';
import GitlabService from '../modules/gitlab.service';

export = class UnitAiCtrl {
    constructor(private readonly gitlabService: GitlabService) {}

    async pushCommit(req: Request, res: Response): Promise<void> {
        const result = await this.gitlabService.pushCommit({
            ref: req.body.head.ref,
            diff_url: req.body.pull_request.diff_url,
        });

        res.send({
            status: 'success',
            response: result,
        });
    }
};
