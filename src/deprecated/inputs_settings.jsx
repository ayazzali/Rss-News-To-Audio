import React from "react";
import { l } from "./utils";
import { NewsPlayer } from "./newsPlayer.jsx";
/** item */
export class Inputs_settings extends React.Component {
  constructor(p) {
    super(p);
    l("settingsInputs constructor ");
    this.state = {
      speaker: localStorage.getItem("speaker") || "zahar",
      rssLink: localStorage.getItem("rssLink") || "http://www.ng.ru/rss/",
      headerOrMore:
        localStorage.getItem("headerOrMore") == "true" ? true : false,
      autoplay: localStorage.getItem("autoplay") == "true" ? true : false //todo first
    };
    this.temporarySetState.bind(this);
  }
  render() {
    l(this.state);
    localStorage.setItem("speaker", this.state.speaker);
    localStorage.setItem("rssLink", this.state.rssLink);
    localStorage.setItem("headerOrMore", this.state.headerOrMore);
    localStorage.setItem("autoplay", this.state.autoplay);
    l(this.state);
    const voices = [
      // works, but weird
      ["женский голос ", "jane"],
      ["женский голос ", "omazh"],
      ["мужские голос ", "zahar"],
      ["мужские голос ", "ermil"]
    ];
    let voices_optioins = [];
    voices.map(_ =>
      voices_optioins.push(
        <div>
          <input
            //name="speaker"
            checked={_[1] === this.state.speaker}
            type="radio"
            //value={_[1]}
            onClick={() => this.setState({ speaker: _[1] })}
          />
          {_}
          <br />
        </div>
      )
    );

    return (
      <div>
        <label for="rss">Ссылка на rss канал </label>
        <input
          name="rss"
          type="text"
          value={this.state.rssLink}
          onChange={() => temporarySetState("rssLink")}
        />{" "}
        <br />
        <input
          type="checkbox"
          checked={this.state.headerOrMore}
          onChange={() =>
            this.setState(prv => {
              return { headerOrMore: !prv.headerOrMore };
            })
          }
        />
        озвучивать только "шапку" <br />
        <input
          type="checkbox"
          checked={this.state.autoplay}
          onChange={() =>
            this.setState(prv => {
              return { autoplay: !prv.autoplay };
            })
          }
        />
        озвучивать сразу после открытя страницы <br />
        Голосa:
        {voices_optioins}
        <qqqinput type="text" /> <br />
        <NewsPlayer {...this.state} />
      </div>
    );
  }
  temporarySetState(fieldName, Value) {}
}
