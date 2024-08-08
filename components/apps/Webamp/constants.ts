export const MAIN_WINDOW = "#main-window";

export const BASE_WINDOW_SIZE = {
  height: 116,
  width: 275,
};

const WEBAMP_SKINS_PATH = "/Users/Public/Documents/Winamp Skins";

export const BASE_WEBAMP_SKINS = {
  availableSkins: [
    { url: `${WEBAMP_SKINS_PATH}/Aqua_X.wsz`, name: "Aqua X" },
    {
      url: `${WEBAMP_SKINS_PATH}/Nucleo_NLog_v102.wsz`,
      name: "Nucleo NLog v2G",
    },
    {
      url: `${WEBAMP_SKINS_PATH}/SpyAMP_Professional_Edition_v5.wsz`,
      name: "SpyAMP Professional Edition v5",
    },
  ],
};

export const MP3_MIME_TYPE = "audio/mpeg";

export const CONTAINER_WINDOW = "#webamp";
