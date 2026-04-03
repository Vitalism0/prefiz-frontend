# Figma Code Connect — PreFiz

Цей каталог містить файли для зв'язку React-компонентів із Figma через [Code Connect](https://github.com/figma/code-connect).

## Структура

```
figma/
├── Header.figma.tsx      # Header компонент
├── Footer.figma.tsx      # Footer компонент
├── Button.figma.tsx      # Primary / Secondary кнопки
├── Card.figma.tsx        # Базова картка (.card)
└── README.md
```

## Як використовувати

### 1. Встанови залежності

```bash
npm install --save-dev @figma/code-connect
```

### 2. Встав посилання на Figma-компоненти

У кожному `.figma.tsx` файлі знайди `FIGMA_URL` і заміни на реальне посилання:

1. Відкрий Figma
2. Вибери потрібний **компонент** (не інстанс — саме сам Component у шарі)
3. Правий клік → **Copy link to selection**
4. Встав у файл замість `FIGMA_URL`

### 3. Опублікуй

```bash
npx figma connect publish
```

При першому запуску буде запит на авторизацію через Figma.

### 4. Перевір у Figma Dev Mode

Відкрий Figma → перейди в **Dev Mode** (іконка `</>` справа вгорі) → вибери компонент → побачиш вкладку **Code** з реальним кодом із проекту.

## Токени

Файл `tokens.json` у корені проекту містить усі дизайн-токени (кольори, відступи, тіні тощо) для імпорту через плагін **Tokens Studio for Figma**.
