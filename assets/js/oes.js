jQuery(document).ready(function () {

    const currentUrl = new URL(window.location.href);
    const viewParam = currentUrl.searchParams.get("view");

    // Highlight links matching current 'view' parameter
    if (viewParam) {
        const selector = `a[href*="view=${viewParam}"]`;
        const links = document.querySelectorAll(selector);
        links.forEach(link => {
            link.classList.add("active");
            if (link.parentElement) {
                link.parentElement.classList.add("active");
            }
        });
    }

    // Highlight links of the current page
    jQuery("[href]").each(function () {
        if (this.id !== 'oes-search' &&
            this.href === location.protocol + '//' + location.host + location.pathname) {
            jQuery(this).addClass("active");
            if(jQuery(this.parentElement).is('li')) jQuery(this.parentElement).addClass("active");
        }
        if(this.href === location.href) {
            jQuery(this).addClass("current");
            if(jQuery(this.parentElement).is('li')) jQuery(this.parentElement).addClass("current");
        }
    });

    // Autofocus and position caret in search input
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

    // Accordion toggles
    jQuery(".oes-accordion").on("click", function (event) {
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("active");
    });
});