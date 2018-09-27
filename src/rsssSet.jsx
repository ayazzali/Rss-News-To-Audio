import React from "react";
import { l } from "./utils";

/** onChange, onNewLink */
export class RsssSet extends React.Component {
  componentDidUpdate() {
    this.nameInput.focus();
    l(this.nameInput);
  }

  render() {
    l(this.props.rssLinks.length);
    let rsss = this.props.rssLinks.map((_, indxOfLink) => (
      <div class="form-group">
        <label for="rss">Ссылка на rss канал </label>
        <input
          className="form-control"
          //name="rss"
          key={indxOfLink}
          type="text"
          value={_}
          onChange={event => {
            event.persist(); //todo xz
            //l(event)
            l("indxOfLink: " + indxOfLink);
            this.props.onChange(indxOfLink, event.target.value);
          }}
          ref={
            indxOfLink + 1 == this.props.rssLinks.length
              ? input => {
                  this.nameInput = input;
                }
              : ""
          }
        />
      </div>
    ));

    return (
      <div>
        {rsss}
        <div class="form-group">
          <label for="rss">Ещё ссылка на rss канал </label>
          <input
            className="form-control"
            placeholder="Тут можно вставить ссылку"
            key={this.props.rssLinks.length}
            type="text"
            value=""
            onChange={event => {
              event.persist(); //todo xz
              //l(event)
              this.props.onNewLink(event.target.value);
            }}
          />
        </div>
      </div>
    );
  }
}
