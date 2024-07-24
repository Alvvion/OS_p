/* eslint-disable jsx-a11y/media-has-caption */
import AppContianer from "@/components/common/AppContainer";
import type { ComponentProps } from "@/components/common/types";

import useVideoPlayer from "./useVideoPlayer";

const VideoPlayer: React.FC<ComponentProps> = ({ id }) => (
  <AppContianer
    id={id}
    useHook={useVideoPlayer}
    className="flex w-full video-player !h-[92%]"
    // style={{
    //   height: `calc(100% - ${sizes.titlebar.height}) !important`,
    // }}
  >
    <video className="video-js vjs-big-play-centered" />
  </AppContianer>
);

export default VideoPlayer;
