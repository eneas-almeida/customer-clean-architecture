import { Errback, Request } from 'express';
import Youch from 'youch';

export const errorMessageAdapter = async (err: Errback, req: Request): Promise<any> => {
    const payload = await new Youch(err, req).toJSON();

    const trace: any[] = [];
    let basePath = null;
    let fn = null;

    payload.error.frames.forEach((frame: any) => {
        [basePath] = frame.file.split('/');

        if (basePath === 'src') {
            fn = frame.calleeShort || 'anonymous';

            trace.push({
                file: frame.file,
                fn,
                line: frame.line,
            });
        }
    });

    return {
        statusCode: 500,
        message: payload.error.message,
        trace,
    };
};
