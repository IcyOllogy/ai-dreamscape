/**
 * Dreamscape Dynamic OG Proxy (Cloudflare Worker)
 * Generates dynamic social preview images using Satori.
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);
    const name = url.searchParams.get('name') || 'Dreamscape Companion';
    const avatar = url.searchParams.get('avatar') || 'https://ai-dreamscape.com/default-avatar.png';

    // SVG Template for the luxury preview card
    const svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#020202',
            backgroundImage: 'radial-gradient(circle at top left, #FF1B6B22, transparent), radial-gradient(circle at bottom right, #00D2FF11, transparent)',
            color: '#fff',
            fontFamily: 'Inter',
          },
          children: [
            {
              type: 'img',
              props: {
                src: avatar,
                style: {
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  border: '4px solid #FF1B6B',
                  marginBottom: 20,
                  boxShadow: '0 0 30px rgba(255, 27, 107, 0.5)',
                },
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 60,
                  fontWeight: 900,
                  letterSpacing: '-0.05em',
                },
                children: name,
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 20,
                  color: '#FF1B6B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  marginTop: 10,
                },
                children: 'AI DREAMSCAPE',
              },
            },
          ],
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [], // Fonts would be loaded here in production
      }
    );

    const resvg = new Resvg(svg);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return new Response(pngBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800, immutable',
      },
    });
  },
};
