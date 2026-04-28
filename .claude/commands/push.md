---
description: Закоммитить, запушить в feature-ветку, открыть PR, смержить и синкнуть master
---

Выполни последовательно — без вопросов между шагами, только в конце или при ошибке:

## 1. Проверь рабочее дерево
- `git status` — посмотри какие файлы изменены/добавлены
- Если изменений нет — сообщи и выйди

## 2. Подготовь staging
- Добавь **все** изменения проекта: `git add -A` из корня репозитория (tracked + untracked, кроме того, что игнорируется `.gitignore`).
- **Не коммить** `.claude/settings.local.json` — он в `.gitignore` (локальные секреты); если случайно попал в staging — `git restore --staged`.
- Не используй выборочный `git add` по «релевантности» — в PR попадает полное состояние рабочей копии, кроме игнора выше.

## 3. Создай ветку
- Префикс по характеру изменений: `feat/`, `style/`, `fix/`, `docs/`, `refactor/`, `chore/`
- Имя — короткое kebab-case, отражающее суть
- `git checkout -b <prefix>/<name>`

## 4. Коммит
- Сообщение: первая строка `<префикс>: <что сделано на русском>`
- Дальше — пункты что изменено и **зачем**, если не очевидно
- В конце:
```
Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```
- Используй HEREDOC чтобы сохранить форматирование

## 5. Push
- `git push -u origin <ветка>`

## 6. PR
- `GH_HOST=github.com gh pr create --repo alexdubnyak/pyramid-rigadev-top --base master --head <ветка> --title "..." --body "..."`
- Body содержит секции `## Summary` и `## Test plan` (чек-листом)
- Title под 70 символов

## 7. Merge
- `GH_HOST=github.com gh pr merge <num> --repo alexdubnyak/pyramid-rigadev-top --squash --delete-branch`

## 8. Sync local master
- `git checkout master && git pull --ff-only origin master`
- Покажи `git log --oneline -3`

## Финальный отчёт
Кратко (1-3 строки): номер PR, ссылка, до какого коммита подтянулся master.

## Важные правила
- Репо на `github.com/alexdubnyak/pyramid-rigadev-top` (не на graebert.ghe.com), всегда `GH_HOST=github.com`
- Прямой push в `master` запрещён политикой — всегда через PR
- Если pre-commit hook падает — НЕ используй `--no-verify`, разберись с причиной
- Никогда не используй `--amend` без явной просьбы
