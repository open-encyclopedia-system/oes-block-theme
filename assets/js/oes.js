jQuery(document).ready(function () {

    /* Check for links of current page*/
    jQuery("[href]").each(function () {
        if (this.id !== 'oes-search' &&
            this.href === location.protocol + '//' + location.host + location.pathname) {
            jQuery(this).addClass("active");
            if(jQuery(this.parentElement).is('li')) jQuery(this.parentElement).addClass("active");
        }
    });

    /* Add search text to input */
    const search_box = document.getElementById('s'),
        caret_post = 10;
    if (search_box) {
        if (search_box.createTextRange) {
            const range = search_box.createTextRange();
            range.move('character', caret_post);
            range.select();
        } else {
            if (search_box.selectionStart) {
                search_box.focus();
                search_box.setSelectionRange(caret_post, caret_post);
            } else
                search_box.focus();
        }
    }

    /* Archive: check for pre-filter from url after loading page */
    oesFilter.filterFromURL();

    /* Accordion */
    jQuery(".oes-accordion").on("click", function (event) {
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("active");
    });
});

/* Responsive --------------------------------------------------------------------------------------------------------*/
if (jQuery(window).width() < 992) {

    /* swap navigation */
    const utility = jQuery('ul.oes-utility-nav'),
        utility_li = utility.parent(),
        search_trigger = jQuery('#oes-search-panel-trigger');
    let main_nav = jQuery('ul.oes-main-nav').parent();

    if(utility_li.length > 0 && main_nav.length > 0) {
        utility_li.parent().parent().parent().parent().hide();
        for (let i = 0; i < utility_li.length; i++) main_nav.append(utility_li[i]);
    }

    if(utility_li.length > 0 && search_trigger.length > 0) {
        jQuery('#oes-top-menus').append(search_trigger);
        search_trigger.children().html('<svg class="search-icon" viewBox="0 0 24 24" width="24" height="24">\n' +
            '\t\t\t\t\t<path d="M13 5c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7l-3.8 3.8 1.1 1.1 3.8-3.8c1 .8 2.3 1.3 3.7 1.3 3.3 0 6-2.7 6-6S16.3 5 13 5zm0 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"></path>\n' +
            '\t\t\t\t</svg>');
    }
}

/* Print -------------------------------------------------------------------------------------------------------------*/
window.matchMedia("print").addEventListener("change", evt => {

    /* open all details blocks */
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

    /* gallery */
    if(evt.matches){
        let gallery = document.body.querySelectorAll(".oes-panel-container-gallery");
        for (let g of gallery){
            let slider = jQuery(g).find('.oes-figure-slider-panel');
            for (let s of slider){
                for (let item of s.children){
                    let itemImg = jQuery(item).find('img').get(0);
                    if(itemImg) {
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
        
    }
    else{
        let printElements = document.querySelectorAll('.oes-gallery-print');
        for(let p of printElements) p.remove();
    }
})