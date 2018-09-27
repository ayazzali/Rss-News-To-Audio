import React from "react";
import { l } from "./utils";
import { NewsPlayer } from "./newsPlayer.jsx";
import { RsssSet } from "./rsssSet.jsx";

/** item */
export class Inputs_settings extends React.Component {
  constructor(p) {
    super(p);
    l("settingsInputs constructor ");
    this.state = {
      speaker: localStorage.getItem("speaker") || "zahar",
      rssLinks: (
        localStorage.getItem("rssLinks") || "https://news.yandex.ru/cosmos.rss"
      ) //"http://www.ng.ru/rss/"
        .split(","),
      headerOrMore:
        localStorage.getItem("headerOrMore") == "true" ? true : true,
      autoplay:
        localStorage.getItem("autoplay") == "false" ? false : /*default*/ true,
      curRssPlayingIndx: 0
    };
    this.temporarySetState.bind(this);
  }
  render() {
    //l(this.state);
    localStorage.setItem("speaker", this.state.speaker);
    localStorage.setItem("rssLinks", this.state.rssLinks.filter(_ => _));
    localStorage.setItem("headerOrMore", this.state.headerOrMore);
    localStorage.setItem("autoplay", this.state.autoplay);
    //l(this.state);
    let voices_optioins = [];
    voices.map(_ =>
      voices_optioins.push(
        <div class="form-check">
          <input
            class="form-check-input" //name="speaker"
            checked={_[1] === this.state.speaker}
            type="radio" //value={_[1]}
            onClick={() => this.setState({ speaker: _[1] })}
          />
          <label class="form-check-label">{_}</label>
        </div>
      )
    );

    let fewRss = this.state.rssLinks.map((_, indx) => {
      //let {} = this.state
      let oneRssSettings = {
        rssLink: _,
        speaker: this.state.speaker,
        headerOrMore: this.state.headerOrMore,
        autoplay:
          this.state.curRssPlayingIndx == indx ? this.state.autoplay : false,
        onNothingToPlay: () => {
          l("onNothingToPlay:" + indx);
          if (this.state.curRssPlayingIndx == indx)
            this.setState(prv => {
              return { curRssPlayingIndx: ++prv.curRssPlayingIndx };
            });
        }
      };
      return <NewsPlayer {...oneRssSettings} />;
    });

    return (
      <div>
        <form>
          <RsssSet
            rssLinks={this.state.rssLinks}
            onChange={(indx, val) =>
              this.setState(prv => {
                let _rssLinks = prv.rssLinks;
                _rssLinks[indx] = val;
                return { rssLinks: _rssLinks };
              })
            }
            onNewLink={val =>
              this.setState(prv => {
                let _rssLinks = prv.rssLinks;
                _rssLinks.push(val);
                return { rssLinks: _rssLinks };
              })
            }
          />
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              checked={this.state.headerOrMore}
              onChange={() =>
                this.setState(prv => {
                  return { headerOrMore: !prv.headerOrMore };
                })
              }
            />
            <label class="form-check-label">озвучивать только "шапку"</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              id="exampleCheck1"
              type="checkbox"
              checked={this.state.autoplay}
              onChange={() =>
                this.setState(prv => {
                  return { autoplay: !prv.autoplay };
                })
              }
            />
            <label class="form-check-label" for="exampleCheck1">
              озвучивать сразу после открытя страницы
            </label>
          </div>
          <br />
          <h5>Голосa:</h5>
          {voices_optioins}
          <qqqinput type="text" /> <br />
          {fewRss}
        </form>
      </div>
    );
  }
  temporarySetState(fieldName, Value) {}
}

const voices = [
  // works, but weird
  ["женский голос ", "jane"],
  ["женский голос ", "omazh"],
  ["мужские голос ", "zahar"],
  ["мужские голос ", "ermil"]
];
