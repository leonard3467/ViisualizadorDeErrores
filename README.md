This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## ErrorVisualizer Component

El componente `ErrorVisualizer` recibe tres parámetros principales:

1. **errorDetails**: Un diccionario donde las claves son los días laborales en los que se dieron fallas y los valores contienen dos propiedades: la cantidad de fallas y el tiempo total en segundos que estuvo activo ese día. Ejemplo de estructura:

    ```js
    const errorDetails = {
      5: { failures: 2, time: 120 },
      7: { failures: 3, time: 180 },
      9: { failures: 1, time: 60 },
      10: { failures: 2, time: 90 },
    };
    ```

2. **workDays**: Una lista de días laborales del mes que sigue la notación estándar ["M", "J", "V", "L", "M", "M", "J", "V", "L", "M", "M", "J", "V", "L", "M", "M", "J", "V", "L", "M", "M"]. Cada letra corresponde a un día laborable de la semana.

    Ejemplo:
    ```js
    const workDays = ["M", "J", "V", "L", "M", "M", "J", "V", "L", "M", "M", "J", "V", "L", "M", "M", "J", "V", "L", "M", "M"];
    ```

3. **currentDay**: El día laboral actual en el que nos encontramos, que se debe pasar como un número. Este valor es necesario para evitar mostrar información errónea en el visualizador. Por ejemplo, si el mes tiene 22 días laborables y estamos en el día 10, el parámetro sería `10`.

### Ejemplo de uso:
```js
<ErrorVisualizer
  errorDetails={{
    5: { failures: 2, time: 120 },
    7: { failures: 3, time: 180 },
    9: { failures: 1, time: 60 },
    10: { failures: 2, time: 90 },
  }}
  workDays={["M", "J", "V", "L", "M", "M", "J", "V", "L", "M", "M", "J", "V", "L", "M", "M", "J", "V", "L", "M", "M"]}
  currentDay={10}
/>
