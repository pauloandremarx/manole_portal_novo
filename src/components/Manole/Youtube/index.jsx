'use client';
import React from "react";
import YouTube from "react-youtube";

  export default class YoutubeEmbed
      extends React.Component {


      render() {
          const opts = {
              width: '100%',
              height: '500px',
              src: `https://www.youtube.com/embed/${this.props.embedId}`,
              playerVars: {
                  autoplay: 1,
                  host: 'https://www.youtube.com',
              },
          };

          return (
              <div  className="video-responsive">
                  <YouTube videoId="sTnm5jvjgjM"
                           opts={opts} onReady={this._onReady} />
              </div>
          );
      }

      _onReady(event) {
          event.target.pauseVideo();
      }
  }







