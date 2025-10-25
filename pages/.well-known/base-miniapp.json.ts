import type { NextApiRequest, NextApiResponse } from 'next';

type MiniappManifest = {
  id: string;
  name: string;
  description: string;
  icon: string;
  homepageUrl: string;
  termsUrl: string;
  privacyUrl: string;
  farcaster: {
    frameUrl: string;
    sessionEndpoint: string;
  };
};

function buildManifest(baseUrl: string): MiniappManifest {
  return {
    id: 'baseapp-miniapp',
    name: 'BaseAPP Miniapp',
    description: 'Starter Base miniapp with Farcaster authentication.',
    icon: `${baseUrl}/icon.svg`,
    homepageUrl: baseUrl,
    termsUrl: `${baseUrl}/terms`,
    privacyUrl: `${baseUrl}/privacy`,
    farcaster: {
      frameUrl: `${baseUrl}/api/frame`,
      sessionEndpoint: `${baseUrl}/api/farcaster/session`
    }
  };
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<MiniappManifest>
) {
  const baseUrl = process.env.BASE_APP_URL ?? 'http://localhost:3000';
  const manifest = buildManifest(baseUrl);

  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
  res.status(200).json(manifest);
}
