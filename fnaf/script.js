import { automaticStatisticSubstraction, cellphoneLight, hide, iluminate, monsterTime, moveScreen, setLS, startMusic, statisticBtn, time, toggleBtn} from "./game.js"
import { timeStart } from "./game_time.js"
import { startGame, textHover } from "./start_screen.js"

const d = document

d.addEventListener("DOMContentLoaded", e => {
    setLS()
    textHover(".new")
    textHover(".continue")
    startGame("#introduction", "#game", ".new")
    startGame("#introduction", "#game", ".continue")
    timeStart(".hour", ".hour p", ".new")
    timeStart(".hour", ".hour p", ".continue")
    moveScreen("#game")
    iluminate("#game")
    cellphoneLight("#game",".left-light", true, ".right-light")
    cellphoneLight("#game",".right-light", false, ".left-light")
    hide(".hide", "#game")
    statisticBtn(".statistics", ".statistics-screen")
    toggleBtn(".statistic button")
    automaticStatisticSubstraction(".statistic div div", ".statistic button")
    time(".new", ".clock")
    time(".continue", ".clock")
    monsterTime()
    startMusic(".new", ".start", ".audio")
})