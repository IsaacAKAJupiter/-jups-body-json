import { Request } from 'jups/build/request';
import { Response } from 'jups/build/response';
import { NextCallback } from 'jups/build/middleware';

export = function bodyJSON(req: Request, res: Response, next: NextCallback) {
    // Return if body already exists.
    if ((req as any).body) {
        next();
        return;
    }

    // Return if content type is not json.
    if (req.headers['content-type'] !== 'application/json') {
        next();
        return;
    }

    // Only do this if the correct method.
    if (
        req.method !== 'POST' &&
        req.method !== 'PUT' &&
        req.method !== 'PATCH'
    ) {
        next();
        return;
    }

    let chunks: Buffer[] = [];
    let bytes: number = 0;
    let tooLarge: boolean = false;

    // Create a listener for getting the data.
    req.on('data', (chunk: Buffer) => {
        // Push the chunk and add to bytes.
        chunks.push(chunk);
        bytes += chunk.length;

        // Check if the bytes are too large.
        if (bytes > 1e7) {
            tooLarge = true;
            throw new Error(`${req.method} data too large.`);
        }
    });

    // Create a listener for the final data.
    req.on('end', () => {
        if (tooLarge) return;

        const data: string = Buffer.concat(chunks).toString();

        // Try to parse the data.
        try {
            (req as any).body = JSON.parse(data);
        } catch (e) {
            (req as any).body = [];
        }

        next();
    });
};
