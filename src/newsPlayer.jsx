import React from "react";
//import { NewsPlayerPure } from "./newsPlayerPure.jsx";
import { NewsJustPlayer } from "./newsJustPlayer.jsx";
import { l, addItemTo_localStorage } from "./utils";
import "./styles.css";
import Parser from "rss-parser";
let parser = new Parser();
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const CorsedUrl = url => CORS_PROXY + url;

/**
 * Props:
 * - rssLink
 * - speaker
 * - headerOrMore
 */
export class NewsPlayer extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      array: [],
      curIndx: 0
    };
    this.getNewsBySrc(this.props.rssLink).then(r => {
      this.setState({ array: r });
    });
  }

  componentDidUpdate(nextProps) {
    l("nP will");
    if (nextProps.rssLink !== this.props.rssLink)
      this.getNewsBySrc(this.props.rssLink).then(r => {
        l("nP GNBS");
        this.setState({ array: r ? r : [] });
      });
  }
  render() {
    let arrayOrigin = this.state.array;
    if (!arrayOrigin) return <p>Error</p>;
    if (arrayOrigin.length === 0) return <p>Loading... I think</p>; //todo
    var listenedLinks = localStorage.getItem(ENUM.listened);
    let arrayToPlayer = arrayOrigin.filter(
      item => (listenedLinks || "").indexOf(item.link) < 0
    );
    let itemToPlay = arrayToPlayer[0];
    if (!itemToPlay) {
      this.props.onNothingToPlay();
      //return <p>Nothing to play. for now u already all listened</p>;
    }
    let arrayToView = arrayOrigin.map(_ => {
      if ((listenedLinks || "").indexOf(_.link) >= 0) _.listened = true;
      return _;
    });
    //arrayToPlayer = arrayToPlayer.sort((a, b) => a.pubDate.substr(4) < b.pubDate.substr(4)?1:-1)
    let renderesListNews = arrayToView.map(_ => (
      <p>
        <a
          key={_.link}
          className={_.listened && "disabled_gray"}
          target="blank"
          href={_.link}
        >
          {_.title}
        </a>
      </p>
    ));

    return (
      <div>
        {itemToPlay ? (
          <NewsJustPlayer
            item={itemToPlay}
            oneItemOfNewsPlayed={this.oneItemOfNewsPlayed.bind(this)}
            speaker={this.props.speaker}
            autoplay={this.props.autoplay}
            headerOrMore={this.props.headerOrMore}
          />
        ) : (
          <p>Nothing to play. for now u already all listened</p>
        )}
        <details>
          <summary>by text - from {this.props.rssLink}</summary>
          {renderesListNews}
        </details>
      </div>
    );
  }
  /** title link pubDate*/
  oneItemOfNewsPlayed(item) {
    //l(item);
    addItemTo_localStorage(ENUM.listened, item.link);
    this.forceUpdate();
  }
  getNewsBySrc(siteUriRss) {
    return parser.parseURL(CorsedUrl(siteUriRss)).then(feed => {
      // console.log(feed.title);// test
      // feed.items.forEach(item => {
      //    console.log(item.title + ":" + item.link); // test
      // });
      return feed.items;
    });
  }
}
const ENUM = { listened: "listened" };
