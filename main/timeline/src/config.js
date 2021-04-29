window.clicktop = () => {
  console.log("test");
  map.on("click", function(e) {
    var nyc_rest = map.queryRenderedFeatures(e.point, {
      layers: ["nyc-restaurant-immigrants-heavy"],
    });
    console.log(nyc_rest, e.lngLat);
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(nyc_rest[0].properties.neighbourhood)
      .addTo(map);
  });
};

// window.clicktop = () => {
//   map.on("mousemove", function (e) {
//     var nyc_rest = map.queryRenderedFeatures(e.point, {
//       layers: ["nyc-restaurant-immigrants-heavy"],
//     });
//     console.log(nyc_rest);
//     console.log(nyc_rest[0].properties.neighbourhood);
//   });
// };
var config = {
  style: "mapbox://styles/smanzar/cknpkn8mj3em717p128ryzthw", // Update this with your own too
  accessToken:
    "pk.eyJ1Ijoic21hbnphciIsImEiOiJja2k2ajRjaWowMXEyMnFxZ2IxbTRhaDkwIn0.bZyOlzap-1dfxKN_BHcCPw", // Update this with your own
  showMarkers: false,
  // theme: "light",
  // title: "86'ed",
  // subtitle: "NYC restaurants during the pandemic",
  // byline: "Sherry Manzar",
  footer: "Source: ACS 2014-2019, NYC Open Data. Eater/Curbed, NYC DoH, ",
  chapters: [
    {
      id: "hero",
      image: "/data/hero-title.svg",
      location: {
        center: [-73.962, 40.694],
        zoom: 10.5,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "easeTo",
      onChapterEnter: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
      onChapterExit: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
    },
    {
      id: "hero",
      image: "/data/hero-subtitle.svg",
      location: {
        center: [-73.962, 40.694],
        zoom: 10.5,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "easeTo",
      onChapterEnter: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
      onChapterExit: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
    },
    {
      id: "slug-style-id",
      image: "/data/cases_pre.svg",
      // title: "Residents who identify as working in the food service industry",
      description: `"On average, 6% of the city's workforce works in the restaurant industry" `,
      location: {
        center: [-73.962, 40.694],
        zoom: 10.5,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "easeTo",
      onChapterEnter: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
      onChapterExit: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
    },
    {
      id: "other-identifier",
      title: "A majority of the workforce lives in Queens and Brooklyn",
      alignment: "left",
      // image: "./path/to/image/source.png",
      // description: "A majority of the workforce lives in Queens and Brooklyn",
      location: {
        center: [-73.962, 40.694],
        zoom: 10.5,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "easeTo",
      callback: "clicktop",
      onChapterEnter: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 1,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
      onChapterExit: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
    },
    {
      id: "bqe",
      title: "Sunset Park",
      alignment: "left",

      // image: "./path/to/image/source.png",
      description:
        ">12% of all Sunset Park's residents worked in the food service industry",
      location: {
        center: [-74.00773, 40.64842],
        zoom: 13,
        pitch: 45.0,
        bearing: 0.0,
      },
      mapAnimation: "easeTo",
      onChapterEnter: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 1,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
      onChapterExit: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
    },
    {
      id: "sp-inc",
      title: "Sunset Park",
      alignment: "left",

      // image: "./path/to/image/source.png",
      description:
        "At the same time, most households have relatively low household income",
      location: {
        center: [-74.00773, 40.64842],
        zoom: 13,
        pitch: 45.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0.01,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
        {
          layer: "median-inc-light",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
        {
          layer: "median-inc-light",
          opacity: 0,
        },
      ],
    },
    {
      id: "uws",
      title: "Upper West Side",
      alignment: "left",

      // image: "./path/to/image/source.png",
      description:
        "While only less than 1.5% of those who lived in Upper West Side were restaurant workers",
      location: {
        center: [-73.97954, 40.78272],
        zoom: 13.82,
        pitch: 45.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 1,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
      onChapterExit: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
    },
    {
      id: "uws-inc",
      title: "Upper West Side",
      alignment: "left",

      // image: "./path/to/image/source.png",
      description: "It is also inhabitated by relatively richer households",
      location: {
        center: [-73.97954, 40.78272],
        zoom: 13.82,
        pitch: 45.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
        {
          layer: "median-inc-heavy",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
        {
          layer: "median-inc-heavy",
          opacity: 0,
        },
      ],
    },
    {
      id: "jfk",
      title: "Queens",
      alignment: "left",

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
          layer: "nyc-restaurant-workers",
          opacity: 1,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
      onChapterExit: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
    },
    {
      id: "immigrants-queens",
      title: "Queens",
      alignment: "left",

      // image: "./path/to/image/source.png",
      description: "Of those workers, on average >85% are immigrants",
      location: {
        center: [-73.846149, 40.748883],
        zoom: 12,
        pitch: 0.0,
        bearing: 0.0,
      },
      callback: "clicktop",
      onChapterEnter: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 1,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
      onChapterExit: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
      ],
    },
    {
      id: "closings-overall",
      alignment: "left",

      title: "Many longtime institutions shutdown during the pandemic",
      // image: "./path/to/image/source.png",
      description:
        "A 'scrapping' activity mapped them from their 'obituaries' in the popular news media to this map",
      location: {
        center: [-73.98863, 40.69056],
        zoom: 10.66,
        pitch: 0.0,
        bearing: 0.0,
      },
      callback: "clicktop",
      onChapterEnter: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
        {
          layer: "closings-geo",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "nyc-restaurant-workers",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants-heavy",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-immigrants",
          opacity: 0,
        },
        {
          layer: "nyc-restaurant-business",
          opacity: 0,
        },
        {
          layer: "closings-geo",
          opacity: 0,
        },
      ],
    },
  ],
};

// const clickPop = map.on("click", "nyc-restaurant-workers", function (e) {
//   new mapboxgl.Popup()
//     .setLngLat(e.lngLat)
//     .setHTML(e.features[0].properties.name)
//     .addTo(map);
//   console.log(e.features[0]);
// });
