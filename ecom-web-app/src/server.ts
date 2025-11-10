import 'zone.js/node'; 
import { provideServerRendering } from '@angular/platform-server';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import express from 'express';
import { createNodeRequestHandler, AngularNodeAppEngine, writeResponseToNodeResponse } from '@angular/ssr/node';


export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.html'); 
  
  const angularApp = new AngularNodeAppEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    angularApp
      .handle(req)
      .then(response => {
        if (response) {
          writeResponseToNodeResponse(response, res);
        } else {
          next(); // Pass control to the next middleware
        }
      })
      .catch(next);
  });

  // The request handler used by the Angular CLI (dev-server and during build).
  return createNodeRequestHandler(server);

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
