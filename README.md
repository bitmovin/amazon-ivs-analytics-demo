# Bitmovin IVS Analytics

This is a [Next.js](https://nextjs.org/) demo application which combines [Amazon IVS]([url](https://ivs.rocks/)) (and AWS Cloudwatch) stream data with [Bitmovin Analytics]([url](https://bitmovin.com/video-analytics/)) from playback clients.

## Permissions

See the [.env.example](https://github.com/bitmovin/amazon-ivs-analytics-demo/blob/main/.env.example) file in the repo root, rename it to `.env` and add your AWS and Bitmovin credentials there.

### Amazon Web Services

For the IVS stream data to fully work, access key and secret key of a user with access to IVS and Cloudwatch must be provided.

### Bitmovin

The API key of a user with Read access to Analytics data must be provided.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
