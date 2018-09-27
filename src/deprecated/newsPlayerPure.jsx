import React from "react";
import { l } from "./utils";

/** DEPRECATED
 * bad logic
 */
export class NewsPlayerPure extends React.Component {
  constructor(p) {
    super(p);
    l("pure");
    this.state = {
      curIndx: 0,
      speaker: "zahar"
    };
  }
  render() {
    l("pure render ");
    l(this.props.array.length);
    l(this.state.curIndx);
    //l(this.props)
    let curItemOfNews = this.props.array[this.state.curIndx].title || "Конец!";

    let curYaSrc = this.toYaSrc(curItemOfNews, this.state.speaker);
    console.log(curYaSrc);
    return (
      <div>
        <h1>pure player</h1>
        <audio
          src={curYaSrc}
          controls
          autoPlay
          onEnded={() => this.oneItemOfNewsPlayed.bind(this)()}
        />
      </div>
    );
  }
  oneItemOfNewsPlayed() {
    this.props.oneItemOfNewsPlayed(this.props.array[this.state.curIndx]);
    this.setState(prv => {
      return { curIndx: prv.curIndx + 1 };
    });
  }

  toYaSrc(text, SPEAKER) {
    return (
      "http://tts.voicetech.yandex.net/generate?text=" +
      encodeURIComponent(text) +
      "&format=mp3&lang=ru-RU&speaker=" +
      SPEAKER +
      "&emotion=good&key=edcd3e1e-d96a-4d16-802c-fe9517644cce"
    );
  }
}
