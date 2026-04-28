---
description: Собрать проект и задеплоить на Alibaba Cloud OSS
---

Выполни последовательно — без вопросов между шагами, только в конце или при ошибке:

## 1. Проверь окружение
- Убедись, что находишься в корне репозитория.
- Проверь наличие `.env.deploy`, но **не выводи содержимое файла**.
- Если `.env.deploy` отсутствует — остановись и сообщи, что нужны `OSS_ACCESS_KEY` и `OSS_SECRET_KEY`.
- Проверь, что Python может импортировать `oss2` и `dotenv`.
- Если `oss2` или `dotenv` не установлены — установи через:
```bash
pip3 install oss2 python-dotenv
```

## 2. Собери проект
- Выполни:
```bash
npm run build
```
- Если сборка упала — остановись, покажи ошибку и не деплой.

## 3. Задеплой на Alibaba OSS
- Выполни:
```bash
python3 deploy.py
```
- Если деплой упал — остановись и покажи ошибку.

## 4. Проверь production URL
- Проверь, что оба URL отдают свежий HTML:
```bash
curl -sI "https://projects.rigadev.top/pyramid/" | sed -n '1,25p'
curl -s "https://projects.rigadev.top/pyramid/" | sed -n '1,16p'
curl -sI "https://projects.rigadev.top/pyramid/index.html" | sed -n '1,25p'
curl -s "https://projects.rigadev.top/pyramid/index.html" | sed -n '1,16p'
```
- Убедись, что HTML содержит `./assets/`, а не старые `/assets/index-...` пути.
- Проверь, что актуальные JS/CSS из HTML отвечают `200`.

## 5. Финальный отчёт
Кратко сообщи:
- сборка прошла или нет;
- деплой прошёл или нет;
- какие production URL проверены;
- если `/pyramid/` всё ещё отдаёт старый HTML — явно скажи, что нужно purge/invalidation CDN в Alibaba.

## Важные правила
- Не печатай секреты из `.env.deploy`.
- Не коммить изменения и не пушь — эта команда только build + deploy.
- Не используй `deploy.sh`, основной путь деплоя — `python3 deploy.py`.
- Если видишь warning `NotOpenSSLWarning`, не считай это ошибкой деплоя, если `deploy.py` завершился с кодом 0.
