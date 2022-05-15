declare global {
    interface Window {
        renderKaTexMath: (el: HTMLElement) => void;
        MathJax: any
    }
}

export function renderMath () {
    if (window.MathJax) {
        window.MathJax.typeset()
    }
}
