import React from "react";
import { NewsPlayer } from "./newsPlayer.jsx";
//import { NewsPlayerPure } from "./newsPlayerPure.jsx";
//import { Inputs_settings } from "./inputs_settings.jsx";
import { Inputs_settings } from "./settingsWithaFewLinks.jsx";

import "./styles.css";

export function Main() {
  // let pureNewsArray = [
  //   "hello",
  //   "Привет",
  //   "Как дела?",
  //   "Жаль что я пока не могу тебя понимать",
  //   "Но вскоре я уже смогу записывать твои ответы",
  //   "А ещё ... я хочу больше узнать людей, хотя бы окружающих и надеюсь я не покажусь наглым"
  // ];

  //<p>(You should choose from which source you would like listen news.)</p>

  // <hr />
  // Tests:
  // <qqqNewsPlayerPure array={pureNewsArray} />
  //   <hr />
  //   <qqqNewsPlayer rssLink="http://www.ng.ru/rss/" />
  //   <hr />

  // <h3>Greetings!</h3>
  //   <h5>
  //     I'm Ayaz. And I did this "News listenng web-app". So you can try it now.
  //     </h5>
  return (
    <div className="App container">
      <h4 class="text-center">
        Тут Вы можете озвучить новости <small>(что угодно) </small> формата rss.
      </h4>
      <small>
        <a href="https://news.yandex.ru/export.html">
          (например тут ссылки на новости формата rss) от Яндекса
        </a>
      </small>

      <Inputs_settings />
    </div>
  );
}
