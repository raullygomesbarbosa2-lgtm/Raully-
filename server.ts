import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { Readable } from 'stream';
import axios from 'axios';
import https from 'https';
import http from 'http';

// Globally disable TLS/SSL verification to support self-signed and expired certificates from custom IPTV sources
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Serve proxy endpoint
  app.get('/api/proxy', async (req, res) => {
    const targetUrl = req.query.url as string;
    if (!targetUrl) {
      return res.status(400).send('Missing url parameter');
    }

    try {
      // Validate target URL is correct URL
      let parsedUrl: URL;
      try {
        parsedUrl = new URL(targetUrl);
      } catch (err) {
        return res.status(400).send('Invalid url parameter');
      }

      // Allow CORS for the response immediately
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

      // We use axios for a high-performance, resilient stream proxy
      const agentOptions = {
        rejectUnauthorized: false, // Bypass SSL issues for custom IPTV links
        keepAlive: true,
      };

      const response = await axios({
        method: 'GET',
        url: targetUrl,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': '*/*',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        },
        timeout: 12000, // 12 seconds timeout to avoid hanging
        responseType: 'stream',
        httpsAgent: new https.Agent(agentOptions),
        httpAgent: new http.Agent(agentOptions),
        maxRedirects: 8,
      });

      const contentType = (response.headers['content-type'] as string) || '';

      // Determine if this is an M3U8/MPEGURL playlist
      const isPlaylist = targetUrl.endsWith('.m3u8') || 
                         targetUrl.includes('.m3u8?') ||
                         contentType.includes('mpegurl') || 
                         contentType.includes('application/x-mpegURL') ||
                         contentType.includes('application/vnd.apple.mpegurl');

      if (isPlaylist) {
        // Read the stream into a string to rewrite playlist links
        const text = await new Promise<string>((resolve, reject) => {
          const chunks: Buffer[] = [];
          response.data.on('data', (chunk: Buffer) => chunks.push(chunk));
          response.data.on('error', (err: Error) => reject(err));
          response.data.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        });

        const lines = text.split('\n');
        const rewrittenLines = [];
        const baseUrl = new URL(targetUrl);

        for (let line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;

          if (trimmedLine.startsWith('#')) {
            // Check for URI attributes in tags, e.g., #EXT-X-KEY:METHOD=AES-128,URI="http://example.com/key"
            // or #EXT-X-MAP:URI="init.mp4"
            let rewrittenLine = trimmedLine;
            const uriRegex = /(URI=")([^"]+)(")/g;
            rewrittenLine = trimmedLine.replace(uriRegex, (match, p1, p2, p3) => {
              try {
                const absolute = new URL(p2, baseUrl).href;
                return `${p1}/api/proxy?url=${encodeURIComponent(absolute)}${p3}`;
              } catch (e) {
                return match;
              }
            });
            rewrittenLines.push(rewrittenLine);
          } else {
            // This is a media playlist or segment URL line
            try {
              const absoluteUrl = new URL(trimmedLine, baseUrl).href;
              rewrittenLines.push(`/api/proxy?url=${encodeURIComponent(absoluteUrl)}`);
            } catch (e) {
              rewrittenLines.push(trimmedLine);
            }
          }
        }

        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        return res.send(rewrittenLines.join('\n'));
      } else {
        // It's a segment (.ts, .aac, .key, etc.) - pipe it
        res.setHeader('Content-Type', contentType || 'video/mp2t');

        const contentLength = response.headers['content-length'];
        if (contentLength) {
          res.setHeader('Content-Length', contentLength as any);
        }

        const cacheControl = response.headers['cache-control'];
        if (cacheControl) {
          res.setHeader('Cache-Control', cacheControl as any);
        }

        response.data.pipe(res);
      }
    } catch (error: any) {
      console.error('Proxy error fetching:', targetUrl, error.message);
      if (!res.headersSent) {
        const statusCode = error.response?.status || 500;
        res.status(statusCode).send(`Proxy error: ${error.message}`);
      }
    }
  });

  // Vite dev or static server middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
