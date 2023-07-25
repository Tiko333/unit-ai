import { NextFunction, Request, RequestHandler, Response } from 'express';

// if we are passing class method we should pass also scope which is class instance
// to be able to use other methods of class via this
export const asyncMethodHandler =
    (cb: RequestHandler, scope: object = null): RequestHandler =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (scope) {
            cb = cb.bind(scope);
        }
        try {
            await cb(req, res, next);
        } catch (e) {
            next(e);
        }
    };
