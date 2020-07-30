import { serverUrl } from "config";

const myContent = {
  mode: "building",
  DOM: {
    blocks: [
      {
        key: "drd1h",
        text: "",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {
          display: "1",
          type: "banner",
          videoUrl: serverUrl + "/storage/media/Nicky Jam - Desahogo Ft. Carla Morrison - Video Oficial.mp4",
        },
      },

      {
        key: "667q8",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {
          display: "1",
          type: "container",
          imageUrl:
            "http://localhost/storage/media/undraw/undraw_social_networking_nqk4.png",
          backgroundType: "solid",
          backgroundColor: "white",
          color: "black",
          internalDom: {
            blocks: [
              {
                key: "2f2al",
                text: " ",
                type: "atomic",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {
                  display: "1",
                  type: "description",
                  imageUrl:
                    serverUrl +
                    "/storage/media/undraw/undraw_email_campaign_qa8y.png",
                  backgroundType: "image",
                  backgroundImageUrl: serverUrl + "/storage/media/1.svg",
                  backgroundColor: "white",
                  color: "#424A67",
                  internalDom: {
                    blocks: [
                      {
                        key: "6lagn",
                        text: "2. Un sistema de marketing automatizado",
                        type: "header-two",
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: "orups",
                        text:
                          "Tloging te proporciona todo lo necesario para desplegar campañas de marketing de ",
                        type: "unstyled",
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: "2rr0v",
                        text: "sistema de páginas personalizables ",
                        type: "unordered-list-item",
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: "3be5m",
                        text: "sistema de administración de clientes",
                        type: "unordered-list-item",
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: "9pr2r",
                        text: "sistema de segimiento de clientes ",
                        type: "unordered-list-item",
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: "8o1fu",
                        text: "Echa un vistaso:",
                        type: "unstyled",
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                    ],
                    entityMap: {},
                  },
                },
              },
              {
                key: "8srn3",
                text: "",
                type: "atomic",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {
                  display: "2",
                  type: "description",
                  variant: "1",
                  imageUrl: serverUrl + "/storage/media/undraw/ImageN1.png",
                  backgroundType: "solid",
                  backgroundColor: "#263867",
                  color: "#FFFFFF",
                  internalDom: {
                    blocks: [
                      {
                        key: "7519i",
                        text: "1.Un lugar donde aprender",
                        type: "header-two",
                        depth: 0,
                        inlineStyleRanges: [
                          {
                            offset: 0,
                            length: 26,
                            style: "color-FFDC00",
                          },
                        ],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: "fda2i",
                        text:
                          "En tloging no solo tienes un sistema de marketing automatizado, también dispones de  un sistema educativo que te enseñará todo lo necesario para desplegar campañas de marketing de forma veloz, eficiente y rentable.",
                        type: "unstyled",
                        depth: 0,
                        inlineStyleRanges: [
                          {
                            offset: 186,
                            length: 28,
                            style: "BOLD",
                          },
                        ],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: "8o805",
                        text: "Echa un vistaso:",
                        type: "unstyled",
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                    ],
                    entityMap: {},
                  },
                },
              },
            ],
            entityMap: {},
          },
        },
      },
    ],
    entityMap: {},
  },
};

export default (state = myContent, action) => {
  if (action.type === "SET_MODE_PREVIEW") {
    return { ...state, mode: "preview" };
  } else if (action.type === "SET_MODE_RENDERING") {
    return { ...state, mode: "rendering" };
  } else if (action.type === "SET_MODE_BUILDING") {
    return { ...state, mode: "building" };
  } else if (action.type === "RESET") {
    return {};
  } else if(action.type === "SET_NEW_DOM"){
    return { ...state, DOM: action.newDom };
  }

  return state;
};
