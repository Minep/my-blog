declare global {
    interface Window {
        renderKaTexMath: (el: HTMLElement) => void;
        MathJax: {
            typesetPromise: () => Promise<void>
        }
    }
}

export async function renderMath () {
    if (window.MathJax) {
        await window.MathJax.typesetPromise()
    }
}
