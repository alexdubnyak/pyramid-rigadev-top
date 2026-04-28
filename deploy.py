#!/usr/bin/env python3
import os
import mimetypes
import oss2

try:
    from dotenv import load_dotenv
    load_dotenv('.env.deploy')
except ImportError:
    pass

ENDPOINT = os.getenv('OSS_ENDPOINT', 'https://oss-eu-central-1.aliyuncs.com')
BUCKET_NAME = os.getenv('OSS_BUCKET', 'riga-projects')
ACCESS_KEY = os.getenv('OSS_ACCESS_KEY')
SECRET_KEY = os.getenv('OSS_SECRET_KEY')
DIST_DIR = 'dist'

if not ACCESS_KEY or not SECRET_KEY:
    raise ValueError('OSS_ACCESS_KEY and OSS_SECRET_KEY must be set in .env.deploy or environment')

auth = oss2.Auth(ACCESS_KEY, SECRET_KEY)
bucket = oss2.Bucket(auth, ENDPOINT, BUCKET_NAME)

PREFIX = 'pyramid/'
LEGACY_ROOT_ASSET_ALIASES = {
    # /pyramid/ is currently cached by Alibaba CDN with these root asset URLs.
    # Keep them serving the current bundle until CDN cache can be purged.
    '.js': 'index-ChkmZGfH.js',
    '.css': 'index-B-ClLUp4.css',
}


def upload_file(oss_key, local_path, filename, root):
    content_type, _ = mimetypes.guess_type(local_path)
    if content_type is None:
        content_type = 'application/octet-stream'

    headers = {'Content-Type': content_type}

    if content_type.startswith('text/') or content_type in ['application/javascript', 'application/json']:
        headers['Content-Type'] = content_type + '; charset=utf-8'

    if filename == 'index.html':
        headers['Cache-Control'] = 'no-cache, must-revalidate'
    elif 'assets' in root:
        headers['Cache-Control'] = 'max-age=31536000'

    bucket.put_object_from_file(oss_key, local_path, headers=headers)
    print(f'  Uploaded: {oss_key} ({content_type})')

# Delete existing files in pyramid/
print('Cleaning pyramid/ in bucket...')
for obj in oss2.ObjectIterator(bucket, prefix=PREFIX):
    bucket.delete_object(obj.key)
    print(f'  Deleted: {obj.key}')

# Delete pyramid and pyramid/ objects specifically
try:
    bucket.delete_object('pyramid')
    print('  Deleted: pyramid')
except:
    pass
try:
    bucket.delete_object('pyramid/')
    print('  Deleted: pyramid/')
except:
    pass

# Upload new files
print('Uploading files...')
for root, dirs, files in os.walk(DIST_DIR):
    for filename in files:
        local_path = os.path.join(root, filename)
        oss_key = PREFIX + os.path.relpath(local_path, DIST_DIR)

        upload_file(oss_key, local_path, filename, root)

assets_dir = os.path.join(DIST_DIR, 'assets')

print('Uploading root asset fallback for cached /pyramid/...')
root_index_path = os.path.join(DIST_DIR, 'index.html')
if os.path.exists(root_index_path):
    # Alibaba CDN currently resolves /pyramid/ through the bucket root index.
    # Keep it fresh too so the short URL points at the current bundle.
    upload_file('index.html', root_index_path, 'index.html', DIST_DIR)

favicon_path = os.path.join(DIST_DIR, 'favicon.svg')
if os.path.exists(favicon_path):
    upload_file('favicon.svg', favicon_path, 'favicon.svg', DIST_DIR)

current_index_assets = {}
for root, dirs, files in os.walk(assets_dir):
    for filename in files:
        local_path = os.path.join(root, filename)
        relative_path = os.path.relpath(local_path, assets_dir)
        upload_file(f'assets/{relative_path}', local_path, filename, root)

        for extension in LEGACY_ROOT_ASSET_ALIASES:
            if filename.startswith('index-') and filename.endswith(extension):
                current_index_assets[extension] = local_path

for extension, legacy_name in LEGACY_ROOT_ASSET_ALIASES.items():
    current_asset_path = current_index_assets.get(extension)
    if current_asset_path:
        upload_file(f'assets/{legacy_name}', current_asset_path, legacy_name, assets_dir)

# Ключи "pyramid" и "pyramid/" (без index в имени) в OSS с trailing slash на практике
# рассинхронизируют метаданные и тело. Держим только prefix pyramid/…file.
for orphan in ('pyramid', 'pyramid/'):
    try:
        bucket.delete_object(orphan)
    except Exception:
        pass

print('\nDeploy successful!')
print('Site: https://projects.rigadev.top/pyramid/')
