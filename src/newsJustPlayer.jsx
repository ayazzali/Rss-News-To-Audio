import React from "react";
import { l } from "./utils";

/** item
 * headerOrMore
 * speaker
 */
export class NewsJustPlayer extends React.Component {
  constructor(p) {
    super(p);
    l("just pure constructor ");
    this.state = {
      //curIndx: 0,
      stopEvent: false
    };
    //import PropTypes from 'prop-types';
  }
  render() {
    l("Just pure player render: ");
    l(this.props);
    window.onkeypress = e => {
      //for stoping playing by spaceKey
      console.log(e.keyCode + " onkeyup");
      if (e.keyCode == 32) {
        // нажат пробел
        try {
          var t = /*self*/ this.refs.audioTag;
          // l(t)
          if (t.paused) t.play();
          else t.pause();
          e.preventDefault();
        } catch (e) {
          l(e);
        }
      }
      //return false;// todo!!! is  that should be here
    };
    let curYaSrc = this.toYaSrc(
      this.props.item,
      this.props.speaker,
      this.props.headerOrMore
    );
    //console.log(curYaSrc);
    return (
      <div>
        <h1>just pure player</h1>
        <audio
          src={curYaSrc}
          ref="audioTag"
          controls
          autoPlay={this.props.autoplay}
          onEnded={() => this.oneItemOfNewsPlayed.bind(this)()}
        />
      </div>
    );
  }
  oneItemOfNewsPlayed() {
    this.props.oneItemOfNewsPlayed(this.props.item);
  }

  toYaSrc(item, SPEAKER, headerOrMore) {
    let text = this.props.item.title || "Конец!";
    l(!item ? l("ERROR item=null in toYaSrc") : "");
    if (headerOrMore === false) {
      let lastDot = item.description.lastIndexOf(".");
      if (lastDot != -1) text = item.description.substring(0, lastDot);
    }
    //l(text);
    return (
      "http://tts.voicetech.yandex.net/generate?text=" +
      encodeURIComponent(text) +
      "&format=mp3&lang=ru-RU&speaker=" +
      SPEAKER +
      "&emotion=good&key=edcd3e1e-d96a-4d16-802c-fe9517644cce"
    );
  }
}
