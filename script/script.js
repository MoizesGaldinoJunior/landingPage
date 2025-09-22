document.addEventListener("DOMContentLoaded", () => {
    const scrollers = document.querySelectorAll(".scroller")


    
    function addAnimation() {
        scrollers.forEach((scroller) => {
            //Torna o scroller rolávell com o teclado.
            scroller.setAttribute("tabindex", 0)

            const scrollerInner = scroller.querySelector(".scroller__inner")
            const scrollerContent = Array.from(scrollerInner.children)

            //Duplica os itens para criar o efeito infinito
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true)
                duplicatedItem.setAttribute("aria-hidden", true)
                scrollerInner.appendChild(duplicatedItem)
            })

            let scrollAmount = 0
            let isPaused = false

            function scroll() {
                if (!isPaused) {
                    //Incrementa a posição de rolagem
                    scrollAmount += 0.5 // Ajuste este valor par controlar a velocidade

                    //Se a rolagem passar da metade(onde os itens originais terminam)
                    if (scrollAmount >= scrollerInner.scrollWidth / 2) {
                        scrollAmount = 0 //Reseta para o início sem "pular"
                    }

                    scrollerInner.style.transform = `translateX(-${scrollAmount}px)`
                }

                //chama a função novamente no próximo quadro de animação
                requestAnimationFrame(scroll)
            }

            //Inicia a animação
            requestAnimationFrame(scroll)

            //Pausa a animação no hover
            scroller.addEventListener("mouseenter", () => {
                isPaused = true
            })

            //Retoma a animação quando o mouse sai
            scroller.addEventListener("mouseleave", () => {
                isPaused = false
            })
        })
    }
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation()
    }
})

const nomes = ["Developer", "UX/UI Designer", "Social Media", "Junior"]

const iam = document.getElementById('iam')
let indiceAtual = 0

function changeNames() {
    iam.textContent = nomes[indiceAtual]

    indiceAtual = (indiceAtual + 1) % nomes.length
}

changeNames()

setInterval(changeNames, 1500)