---
title: "Presencia de Discord en tu sitio web"
description: "Eleva tu sitio web con la presencia de Discord"
featured: true
seriesId: portfolio
orderInSeries: 1
pubDate: "Jul 15 2023"
cover: "~/assets/posts/discord/discord.webp"
coverAlt: "Hero Image"
tags:
  - portfolio
  - discord
---

## Introducción

Como desarrollador frontend, siempre estoy buscando formas de hacer que mi sitio web personal sea más atractivo e interactivo. Recientemente, descubrí una herramienta emocionante llamada <a href="https://github.com/Phineas/lanyard" target="_blank">Lanyard</a> que te permite mostrar tu presencia de Discord en tu sitio web. Esta característica no solo permite a tus visitantes saber qué estás haciendo en ese momento, sino que también indica tu disponibilidad. En este artículo, te guiaré a través del proceso de integrar Lanyard en tu sitio web y los beneficios que puede aportar a tu presencia en línea.

## ¿Qué es la presencia de Discord?

La presencia de Discord se refiere a la capacidad de mostrar el estado, la actividad y la presencia actual de un usuario en la plataforma de Discord. Permite a los visitantes del sitio web ver quién está en línea en ese momento, qué juegos están jugando e incluso interactuar directamente con ellos.

## Lanyard

Es un servicio que facilita enormemente la exportación de tu presencia en vivo de Discord a un punto final de API `api.lanyard.rest/v1/users/:tu_id` y a un WebSocket para que lo uses donde desees.

## Empezando

### Requisitos previos

- En primer lugar, debemos ingresar al <a href="https://discord.gg/lanyard" target="_blank">servidor de Discord de Lanyard</a>.
- Nuestro Discord debe estar en modo desarrollador.

#### Modo desarrollador

1. Abre tus ajustes de Discord (el icono al lado de tu nombre en la parte inferior izquierda).
2. Ve a "Avanzado".
3. Activa el modo desarrollador.

### Llamada a la API

Para obtener nuestra presencia de Discord con Lanyard, necesitamos nuestro ID de usuario, que lo obtendremos desde **Ajustes** > **Mi cuenta**.
![Get user ID](~/assets/posts/discord/userid.webp)

Ahora podemos probarlo desde el navegador usando la siguiente URL:

```curl title="GET" copy
api.lanyard.rest/v1/users/:your_id
```

Obtendremos algo como esto:

```json title="Example response" {30, 32-73}
{
  "success": true,
  "data": {
    "active_on_discord_mobile": false,
    "active_on_discord_desktop": true,
    "listening_to_spotify": true,
    // Lanyard KV
    "kv": {
      "location": "Los Angeles, CA"
    },
    // A continuación, se muestra un objeto "spotify" personalizado, que será nulo si listening_to_spotify es false
    "spotify": {
      "track_id": "3kdlVcMVsSkbsUy8eQcBjI",
      "timestamps": {
        "start": 1615529820677,
        "end": 1615530068733
      },
      "song": "Let Go",
      "artist": "Ark Patrol; Veronika Redd",
      "album_art_url": "https://i.scdn.co/image/ab67616d0000b27364840995fe43bb2ec73a241d",
      "album": "Let Go"
    },
    "discord_user": {
      "username": "Phineas",
      "public_flags": 131584,
      "id": "94490510688792576",
      "discriminator": "0001",
      "avatar": "a_7484f82375f47a487f41650f36d30318"
    },
    "discord_status": "online",
    // activities contiene el arreglo de actividades de Discord que se envía con las presencias
    "activities": [
      {
        "type": 2,
        "timestamps": {
          "start": 1615529820677,
          "end": 1615530068733
        },
        "sync_id": "3kdlVcMVsSkbsUy8eQcBjI",
        "state": "Ark Patrol; Veronika Redd",
        "session_id": "140ecdfb976bdbf29d4452d492e551c7",
        "party": {
          "id": "spotify:94490510688792576"
        },
        "name": "Spotify",
        "id": "spotify:1",
        "flags": 48,
        "details": "Let Go",
        "created_at": 1615529838051,
        "assets": {
          "large_text": "Let Go",
          "large_image": "spotify:ab67616d0000b27364840995fe43bb2ec73a241d"
        }
      },
      {
        "type": 0,
        "timestamps": {
          "start": 1615438153941
        },
        "state": "Workspace: lanyard",
        "name": "Visual Studio Code",
        "id": "66b84f5317e9de6c",
        "details": "Editing README.md",
        "created_at": 1615529838050,
        "assets": {
          "small_text": "Visual Studio Code",
          "small_image": "565945770067623946",
          "large_text": "Editing a MARKDOWN file",
          "large_image": "565945077491433494"
        },
        "application_id": "383226320970055681"
      }
    ]
  }
}
```

Para lograr obtener tu foto de perfil lo podemos hacer de la siguiente manera:

```js title="JavaScript"
// Obtenemos la respuesta de la API
const { data } = await fetch("https://api.lanyard.rest/v1/users/:your_id").then((res) =>
  res.json()
);

// Obtenemos la imagen de perfil
const avatar = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`;
```

Tambien podemos obtener la imagen de la actividad:

```js title="JavaScript"
// Obtenemos la respuesta de la API
const { data } = await fetch("https://api.lanyard.rest/v1/users/:your_id").then((res) =>
  res.json()
);

// Filtramos las actividades para obtener solo las de tipo 0 (Jugando)
const activities = data.activities.filter((activity) => activity.type === 0);

// Obtenemos la primera actividad
const activity = Array.isArray(activities) ? activities[0] : activities;

// Obtenemos la imagen de la actividad
const activityImage = `https://cdn.discordapp.com/app-assets/${activity?.application_id}/${activity?.assets?.large_image}.webp`;
```

Te recomiendo hacer validaciones para evitar errores ya que si no estas jugando nada, la actividad sera `undefined` y no podras obtener la imagen.

## Conclusión

Lanyard es una herramienta muy útil para mostrar tu presencia de Discord en tu sitio web, y lo mejor de todo es que es muy fácil de usar. Espero que este artículo te haya ayudado a aprender cómo usar Lanyard en tu sitio web. ¡Gracias por leer! 🎉 🎉 🎉
