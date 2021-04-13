var config = {
  style: "mapbox://styles/smanzar/cki6j8dxf3o2p19trqspv7hoh", // Update this with your own too
  accessToken:
    "pk.eyJ1Ijoic21hbnphciIsImEiOiJja2k2ajRjaWowMXEyMnFxZ2IxbTRhaDkwIn0.bZyOlzap-1dfxKN_BHcCPw", // Update this with your own
  showMarkers: false,
  // theme: "light",
  alignment: "left",
  title: "New York City Restaurant Industry",
  subtitle: "Looking at where the labour lives",
  // byline: "Sherry Manzar",
  footer: "Source: ACS 2018, NYC Open Data.",
  chapters: [
    {
      id: "slug-style-id",
      title: "Residents who identify as working in the food service industry",
      description:
        "On average, 6% of the city's workforce works in the restaurant industry",
      location: {
        center: [-73.962, 40.694],
        zoom: 10.5,
        pitch: 0,
        bearing: 0,
      },
      onChapterEnter: [
        {
          layer: "restaurant-workforce",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "restaurant-workforce",
          opacity: 0,
        },
      ],
    },
    {
      id: "other-identifier",
      title: "A majority of the workforce lives in Queens and Brooklyn",
      // image: "./path/to/image/source.png",
      // description: "A majority of the workforce lives in Queens and Brooklyn",
      location: {
        center: [-73.962, 40.694],
        zoom: 10.5,
        pitch: 0,
        bearing: 0,
      },
      onChapterEnter: [
        {
          layer: "restaurant-workforce",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "restaurant-workforce",
          opacity: 0,
        },
      ],
    },
    {
      id: "bqe",
      title: "Sunset Park",
      // image: "./path/to/image/source.png",
      description:
        ">12% of all Sunset Park's residents worked in the food service industry",
      location: {
        center: [-73.99935, 40.66303],
        zoom: 14,
        pitch: 45.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "restaurant-workforce",
          opacity: 1,
        },
        {
          layer: "restaurant-workforce",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "restaurant-workforce",
          opacity: 0,
        },
        {
          layer: "restaurant-workforce",
          opacity: 0,
        },
      ],
    },
    {
      id: "lincoln-tunnel",
      title: "Upper West Side",
      // image: "./path/to/image/source.png",
      description:
        "While only less than 1.5% of those who lived in Upper West Side",
      location: {
        center: [-73.99772, 40.7572],
        zoom: 14.26,
        pitch: 45.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "restaurant-workforce",
          opacity: 1,
        },
        {
          layer: "restaurant-workforce",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "restaurant-workforce",
          opacity: 0,
        },
        {
          layer: "restaurant-workforce",
          opacity: 0,
        },
      ],
    },
    {
      id: "jfk",
      title: "Queens",
      // image: "./path/to/image/source.png",
      description:
        "Almost 1 in 5 restaurant workers live in these neighbourhoods of Queens.",
      location: {
        center: [-73.846149, 40.748883],
        zoom: 12,
        pitch: 0.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "restaurant-workforce",
          opacity: 1,
        },
        {
          layer: "restaurant-workforce",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "restaurant-workforce",
          opacity: 0,
        },
        {
          layer: "restaurant-workforce",
          opacity: 0,
        },
      ],
    },
  ],
};
