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
            let slider = jQuery(g).find('.oes-figure-slider-panel');
            for (let s of slider) {
                for (let item of s.children) {
                    let itemImg = jQuery(item).find('img').get(0);
                    if (itemImg) {
                        const imgID = itemImg.dataset.id;
                        let figcaption = jQuery(g).find('.oes-panel-figcaption-' + imgID).get(0);
                        let newFigcaption = figcaption.cloneNode(true);
                        jQuery(newFigcaption).addClass('active');
                        jQuery(newFigcaption).addClass('oes-gallery-print');
                        item.append(newFigcaption);
                    }
                }
            }
        }
    } else {
        let printElements = document.querySelectorAll('.oes-gallery-print');
        for (let p of printElements) p.remove();
    }
});