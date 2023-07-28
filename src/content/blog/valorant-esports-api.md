---
title: "Valorant Esports API"
description: "Crea tu propia web de esports de Valorant con esta API"
featured: true
pubDate: "Jul 26 2023"
cover: "~/assets/posts/vlr/coverpage.webp"
coverAlt: "Valorant Esports API"
tags:
  - valorant
  - api
---

## Introducción

Hace unos meses me puse a buscar una API de Valorant para poder hacer una web de esports de Valorant, pero no encontré ninguna que me convenciera, así que decidí hacer la mía propia.

## ¿Qué es una API?

Una API es un conjunto de funciones y procedimientos que cumplen una o muchas funciones específicas, que se integran en el software de una aplicación. En este caso, la API que he creado es una API REST, que es un tipo de API que se basa en el protocolo HTTP.

## ¿Cómo funciona?

Para acceder a los datos, se hace una petición HTTP a la API, y esta devuelve los datos en formato JSON.

Hay que tener en cuenta que la API está en fase beta, por lo que puede haber cambios en el futuro.

### ¿Cómo es por dentro?

La API está hecha con **Node.js** y **Express**. Hace Scraping con <a href="https://cheerio.js.org" target="_blank">**CheerioJS**</a> a la página de <a href="https://vlr.gg" target="_blank">vlr.gg</a> para obtener los datos.

## ¿Qué datos ofrece?

La API ofrece los siguientes datos:

| Equipos                              |     |
| :----------------------------------- | --: |
| Obtener todos los equipos por región | ✔️ |
| Obtener un equipo por ID             | ✔️ |

| Jugadores                   |     |
| :-------------------------- | --: |
| Obtener todos los jugadores | ✔️ |
| Obtener un jugador por ID   | ✔️ |

| Eventos                   |     |
| :------------------------ | --: |
| Obtener todos los eventos |  🛠 |
| Obtener un evento por ID  |  🛠 |

| Partidos                   |     |
| :------------------------- | --: |
| Obtener todos los partidos |  🛠 |
| Obtener un partido por ID  |  🛠 |

| Resultados                   |     |
| :--------------------------- | --: |
| Obtener todos los resultados |  🛠 |
| Obtener un resultado por ID  |  🛠 |

Algunos datos están en desarrollo, por lo que no están disponibles todavía.

## ¿Cómo usarla?

Mira como usarla en la <a href="https://vlresports.vercel.app" target="_blank">documentación de la API</a>. Alli podras ver como hacer las peticiones, los datos que devuelve y hacer tu propias pruebas.

![API Playground](~/assets/posts/vlr/playground.webp)

## Ejemplos

### Obtener un equipo por ID

```js title="(JavaScript) Axios"
import axios from "axios";

const options = {
  method: "GET",
  url: "https://alert-puce-neckerchief.cyclic.app/api/v1/teams/1001",
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
```

#### Respuesta de ejemplo

![Heretics](~/assets/posts/vlr/team.webp)

```json
{
  "status": "string", // Estado de la petición
  "data": {
    "info": {
      // Información del equipo
      "name": "string",
      "tag": "string",
      "logo": "string"
    },
    "players": [
      // Jugadores del equipo
      {
        "id": "string",
        "url": "string",
        "user": "string",
        "name": "string",
        "img": "string",
        "country": "string"
      }
    ],
    "staff": [
      // Staff del equipo
      {
        "id": "string",
        "url": "string",
        "user": "string",
        "name": "string",
        "tag": "string",
        "img": "string",
        "country": "string"
      }
    ],
    "events": [
      // Eventos en los que ha participado el equipo
      {
        "id": "string",
        "url": "string",
        "name": "string",
        "results": ["string"],
        "year": "string"
      }
    ],
    "results": [
      // Partidos del equipo
      {
        "match": {
          // Información del partido
          "id": "string",
          "url": "string"
        },
        "event": {
          // Información del evento
          "name": "string",
          "logo": "string"
        },
        "teams": [
          // Equipos que han jugado el partido
          {
            "name": "string",
            "tag": "string",
            "logo": "string",
            "points": "string"
          }
        ]
      }
    ],
    "upcoming": [
      // Próximos partidos del equipo
      {
        "match": {
          "id": "string",
          "url": "string"
        },
        "event": {
          "name": "string",
          "logo": "string"
        },
        "teams": [
          {
            "name": "string",
            "tag": "string",
            "logo": "string"
          }
        ]
      }
    ]
  }
}
```

## Ejemplos web

### <a href="https://fusiongg.vercel.app/teams/valorant" target="_blank">Fusion Esports</a>

![Fusion Esports](~/assets/posts/vlr/fusion.webp)
