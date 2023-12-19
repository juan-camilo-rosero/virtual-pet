const d = document
export function timeStart(timeDiv, time, btn) {
    const $timeDiv = d.querySelector(timeDiv),
    $time = d.querySelector(time),
    $btn = d.querySelector(btn)

    $btn.addEventListener("click", e => {
        setTimeout(() => {
            $timeDiv.classList.remove("hidden")
        }, 2000);
        setTimeout(() =>  $timeDiv.classList.add("none") , 2500);
        setTimeout(() =>  $timeDiv.classList.remove("none") , 3000);
        setTimeout(() =>  $timeDiv.classList.add("none") , 3500);
    })
}