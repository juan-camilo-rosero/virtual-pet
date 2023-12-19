export function textHover(text) {
    const d = document,
    $text = d.querySelector(text),
    contentText = $text.textContent

    $text.addEventListener("mouseover", e => $text.textContent = `>> ${contentText}`)
    $text.addEventListener("mouseout", e => $text.textContent = contentText)
}

export function startGame(startScreen, gameScreen, btn) {
    const d = document,
    $startScreen = d.querySelector(startScreen),
    $gameScreen = d.querySelector(gameScreen),
    $btn = d.querySelector(btn)

    $btn.addEventListener("click", e => {
        $startScreen.classList.add("hidden")
        setTimeout(() => {
            $gameScreen.classList.remove("none")
            $gameScreen.classList.remove("hidden")
            $startScreen.classList.add("none")
        }, 1000);
    })
    
}