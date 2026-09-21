window.matchMedia("print").addEventListener("change", evt => {

    // Automatically expand <details> elements during print
    let elms;
    if (evt.matches) {
        elms = document.body.querySelectorAll("details:not([open])");
        for (let e of elms) {
            e.setAttribute("open", "");
            e.dataset.wasclosed = "";
        }
    } else {
        elms = document.body.querySelectorAll("details[data-wasclosed]");
        for (let e of elms) {
            e.removeAttribute("open");
            delete e.dataset.wasclosed;
        }
    }

    // Ensure gallery captions are visible in print
    if (evt.matches) {
        let gallery = document.body.querySelectorAll(".oes-panel-container-gallery");
        for (let g of gallery) {
            let sliders = g.querySelectorAll('.oes-figure-slider-panel');
            for (let s of sliders) {
                for (let item of s.children) {
                    let itemImg = item.querySelector('img');
                    if (itemImg) {
                        const imgID = itemImg.dataset.id;
                        let figcaption = g.querySelector('.oes-panel-figcaption-' + imgID);
                        if (figcaption) {
                            let newFigcaption = figcaption.cloneNode(true);
                            newFigcaption.classList.add('active', 'oes-gallery-print');
                            item.append(newFigcaption);
                        }
                    }
                }
            }
        }
    } else {
        let printElements = document.querySelectorAll('.oes-gallery-print');
        for (let p of printElements) p.remove();
    }
});