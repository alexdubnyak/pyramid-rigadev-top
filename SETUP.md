# Настройка окружения

Инструкции по настройке нового компьютера для работы с этим проектом. Включает настройку Claude Code + Figma MCP + GitHub CLI.

## 1. Базовые зависимости

Установить:
- [Node.js](https://nodejs.org/) 20+
- [VS Code](https://code.visualstudio.com/)
- [Claude Code extension](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code) для VS Code
- [GitHub CLI](https://cli.github.com/): `brew install gh` (macOS)

Затем в корне проекта:
```bash
npm install
npm run dev
```
Dev-сервер поднимется на `http://localhost:5173/pyramid/` (или другой свободный порт).

## 2. Figma MCP (официальный)

Позволяет Claude читать макеты, делать скриншоты, скачивать ассеты из Figma.

### Шаг 2.1. Добавить MCP сервер

Запустить в терминале (**не в Claude Code**, а в обычном shell):
```bash
claude mcp add figma --transport http https://mcp.figma.com/mcp
```

Или вручную — добавить в `~/.claude.json` в секцию `projects.<путь-к-проекту>.mcpServers`:
```json
"figma": {
  "type": "http",
  "url": "https://mcp.figma.com/mcp"
}
```

### Шаг 2.2. Перезапустить Claude Code

Закрыть и снова открыть VS Code (или перезагрузить окно через Cmd+Shift+P → "Developer: Reload Window").

После рестарта в Claude Code появятся инструменты `mcp__figma__authenticate` и `mcp__figma__complete_authentication`.

### Шаг 2.3. OAuth авторизация

1. Попросить Claude: "авторизуйся в Figma". Claude вызовет `mcp__figma__authenticate` и выдаст ссылку.
2. Открыть ссылку в браузере, подтвердить доступ.
3. Браузер покажет "Authentication Successful".
4. Перезапустить Claude Code (закрыть/открыть окно).
5. После рестарта должны появиться полные инструменты: `get_design_context`, `get_screenshot`, `download_figma_images`, `create_new_file`, `generate_figma_design` и др.

### Шаг 2.4. Проверка

Спросить Claude: "проверь, работает ли figma mcp". Он должен уметь читать макеты по fileKey/nodeId.

### Частые проблемы

- **После OAuth инструменты не появились** — подождать несколько секунд и перезапустить VS Code ещё раз. Иногда токен сохраняется не сразу.
- **Показываются только `authenticate`/`complete_authentication`** — авторизация не завершилась, повторить шаг 2.3.
- **Permission denied для mcp_figma** — добавить `"mcp__figma"` в `permissions.allow` в `~/.claude/settings.json`.

## 3. GitHub CLI

### Важно про хосты

На машине пользователя одновременно настроены два gh-хоста:
- `graebert.ghe.com` (корпоративный — активен по умолчанию)
- `github.com` (личный — репозиторий этого проекта)

**Репозиторий `pyramid-rigadev-top` на github.com**, не на GHE. Активный хост может быть не github.com — это нормально, просто нужно явно указывать `--hostname github.com` или `GH_HOST=github.com`.

### Шаг 3.1. Авторизация для github.com

```bash
gh auth login --hostname github.com --git-protocol https --web
```

Откроется браузер с device code. Ввести код, подтвердить scopes (`repo`, `workflow`, `read:org`, `gist`).

### Шаг 3.2. Проверка

```bash
gh auth status
```
Должны быть залогинены оба хоста (если есть оба). Для работы с этим проектом важен github.com → аккаунт `alexdubnyak`.

### Шаг 3.3. Использование

При создании PR из Claude Code или терминала:
```bash
GH_HOST=github.com gh pr create --repo alexdubnyak/pyramid-rigadev-top ...
```

Или если `github.com` — активный хост, можно без `GH_HOST`.

## 4. Политика push в master

В `~/.claude/settings.json` (или на уровне policy) прямой `git push origin master` может быть **заблокирован** — это защита от байпаса PR review. Workflow:

1. Коммит создаётся на ветке `feat/<имя>` (не на master).
2. `git push -u origin feat/<имя>` — пушится фич-ветка.
3. `gh pr create` — создаётся PR.
4. После ревью — merge через GitHub UI или `gh pr merge`.

Если всё-таки нужен direct push в master — попросить Claude, получить permission dialog, одобрить вручную.

## 5. Pencil MCP (опционально)

Для работы с `.pen` файлами (альтернатива Figma для локальных дизайнов). Установить [Pencil.app](https://pencil.app/) и добавить в `~/.claude.json`:
```json
"pencil": {
  "command": "/Applications/Pencil.app/Contents/Resources/app.asar.unpacked/out/mcp-server-darwin-arm64",
  "args": ["--app", "desktop"],
  "type": "stdio"
}
```

## 6. Итого

После всех шагов должно работать:
- ✅ `npm run dev` — локальный сервер
- ✅ Claude Code читает макеты Figma и скачивает ассеты
- ✅ Claude Code может пушить ветки и создавать PR на github.com
- ✅ CLAUDE.md — правила для Claude как работать с кодом и Figma
