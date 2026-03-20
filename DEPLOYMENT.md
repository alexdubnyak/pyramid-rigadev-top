# Deployment Guide

## Production URL

**Working URL:** https://projects.rigadev.top/pyramid/index.html

⚠️ **Important:** Due to aggressive CDN caching on Alibaba Cloud OSS, the short URL `https://projects.rigadev.top/pyramid/` may serve cached content. Always use the full URL with `index.html` to access the latest version.

## Deploy Command

```bash
npm run build && python3 deploy.py
```

## Configuration

- **Bucket:** `riga-projects`
- **Path:** `/pyramid/`
- **Base URL:** `/pyramid/` (configured in `vite.config.js`)

## Files

- `deploy.py` - Deployment script using Alibaba Cloud OSS SDK
- `.env.deploy` - Credentials (gitignored)
- `redirect.html` - Redirect helper (currently not working due to CDN cache)

## Asset Resolution

Icons and images are resolved via `src/utils/getAssetPath.js` using Vite's `import.meta.glob` to ensure proper bundling and URL generation in production.

## CDN Cache Issue

The CDN cache on `/pyramid/` cannot be purged without console access. If you need to clear the cache:

1. Access Alibaba Cloud Console
2. Navigate to CDN settings for `projects.rigadev.top`
3. Purge/Invalidate the `/pyramid/` path

Or simply use the full URL: `https://projects.rigadev.top/pyramid/index.html`
