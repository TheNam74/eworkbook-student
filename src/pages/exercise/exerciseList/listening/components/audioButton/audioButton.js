/* eslint-disable */

import "./audioButton.scss"
import "./index"
export function audioButton(file){
     return(
        <div>
            <div class="player">
                <div class="music-box">
                    <audio class="music-element">
                        <source src="https://dict.youdao.com/dictvoice?audio=pencil" type="audio/mp3"/>
                    </audio>
                    <span class="play" onclick="handlePlay()">
                        <i class="material-icons">play_arrow</i>
                    </span>
                </div>
            </div>
        </div>
    )
}
