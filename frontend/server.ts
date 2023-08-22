import { createServer, IncomingMessage, ServerResponse } from 'http';
import next from 'next';
import { parse, UrlWithParsedQuery } from 'url';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as mime from 'mime';
import * as os from 'os';
import * as fs from 'fs';

const envFilePath = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : '.env.development';

dotenv.config({ path: path.join(process.cwd(), envFilePath) });

const dev = process.env.NODE_ENV !== 'production';
const port = Number(process.env.PORT) || 5002;
const app = next({ dev });
const handle = app.getRequestHandler();

async function serverHandler(req: IncomingMessage, res: ServerResponse) {
    const parsedUrl = parse(req.url || '', true);
    const { pathname } = parsedUrl;

    const publicPath = path.join(process.cwd(), 'public', pathname || '');

    try {
        const stats = await fsPromises.stat(publicPath);
        if (stats.isFile()) {
            const contentType = mime.getType(publicPath) || 'application/octet-stream';
            res.setHeader('Content-Type', contentType);

            const readStream = fs.createReadStream(publicPath);
            readStream.pipe(res);

            readStream.on('error', (err) => {
                console.error('Error occurred handling', req.url, err);
            });
        } else {
            handleRequest(req, res, parsedUrl);
        }
    } catch (err) {
        handleRequest(req, res, parsedUrl);
    }
}

function handleRequest(req: IncomingMessage, res: ServerResponse, parsedUrl: UrlWithParsedQuery) {
    handle(req, res, parsedUrl);
}

app.prepare().then(() => {
    createServer(serverHandler).listen(port, () => {
        const localIPs = getLocalIP();
        console.log(`Local IP ready on http://${localIPs}:${port}`);
        console.log(`> Server is ready on http://localhost:${port}`);
    });
});

function getLocalIP() {
    const networkInterfaces = os.networkInterfaces();
    const results: string[] = [];

    for (const name of Object.keys(networkInterfaces)) {
        for (const net of networkInterfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                results.push(net.address);
            }
        }
    }

    return results.join(', ');
}