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


def upload_file(oss_key, local_path, filename, root):
    content_type, _ = mimetypes.guess_type(local_path)
    if content_type is None:
        content_type = 'application/octet-stream'

    headers = {'Content-Type': content_type}

    if content_type.startswith('text/') or content_type in ['application/javascript', 'application/json']:
        headers['Content-Type'] = content_type + '; charset=utf-8'

    if filename == 'index.html':
        headers['Cache-Control'] = 'no-cache'
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

# Upload redirect for pyramid and pyramid/
redirect_path = 'redirect.html'
if os.path.exists(redirect_path):
    upload_file('pyramid', redirect_path, 'redirect.html', '.')
    upload_file('pyramid/', redirect_path, 'redirect.html', '.')

print('\nDeploy successful!')
print('Site: https://projects.rigadev.top/pyramid/')
