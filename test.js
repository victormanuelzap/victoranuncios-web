(() => {
    setInterval(() => {
        const actionsButtons = document.querySelectorAll('.e1hk3hf90')
        // selecciona el tercero
        let likeButton = null
        if (actionsButtons.length > 2) {
            likeButton = actionsButtons[2]
        }
        
        if (!likeButton) {
            return
        }

        const bottomArrowButton = document.querySelector('[aria-label="Ir al siguiente vídeo"]')
        likeButton.click()

        setTimeout(() => {
            bottomArrowButton.click()
        }, 500)
    }, 3000)
})()