import type { NextApiRequest, NextApiResponse } from 'next';

const HUB_URL = process.env.FARCASTER_HUB_URL ?? 'https://hub.farcaster.xyz';
const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;

type SessionRequestBody = {
  message?: unknown;
  signature?: string;
  state?: string;
};

type ErrorResponse = {
  error: string;
};

type SuccessResponse = {
  fid: number | null;
  isValid: boolean;
  signer?: unknown;
  custodyAddress?: string;
  state?: string;
};

async function getAuthClient() {
  const authKit = await import('@farcaster/auth-kit');
  if (typeof authKit.createAuthClient === 'function') {
    return authKit.createAuthClient({
      hubUrl: HUB_URL,
      neynarApiKey: NEYNAR_API_KEY
    });
  }

  if (typeof authKit.getAuthClient === 'function') {
    return authKit.getAuthClient({
      hubUrl: HUB_URL,
      neynarApiKey: NEYNAR_API_KEY
    });
  }

  if (typeof authKit.createAuthClientWithNeynar === 'function') {
    return authKit.createAuthClientWithNeynar({
      hubUrl: HUB_URL,
      apiKey: NEYNAR_API_KEY
    });
  }

  throw new Error('Unsupported auth kit version');
}

async function verifySigner(payload: SessionRequestBody) {
  const authClient = await getAuthClient();

  if (typeof payload.message === 'undefined' || typeof payload.signature !== 'string') {
    throw new Error('Invalid verification payload');
  }

  if (typeof authClient.verifySigner === 'function') {
    return authClient.verifySigner(payload as never);
  }

  if (typeof authClient.verifySignInMessage === 'function') {
    return authClient.verifySignInMessage(payload as never);
  }

  if (typeof authClient.validate === 'function') {
    return authClient.validate(payload as never);
  }

  throw new Error('Auth client does not expose a verification method');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const verification = await verifySigner(req.body as SessionRequestBody);

    const isValid = Boolean(verification?.isValid ?? verification?.valid ?? verification?.success);
    const fid =
      typeof verification?.fid === 'number'
        ? verification.fid
        : typeof verification?.user?.fid === 'number'
          ? verification.user.fid
          : null;

    return res.status(isValid ? 200 : 401).json({
      fid,
      isValid,
      signer: verification?.signer ?? verification?.user,
      custodyAddress: verification?.custodyAddress ?? verification?.user?.custodyAddress,
      state: (req.body as SessionRequestBody).state
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: message });
  }
}
