document.addEventListener("DOMContentLoaded", () => {

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
    const baseUrl = location.protocol + '//' + location.host + location.pathname;
    for (const el of document.querySelectorAll("[href]")) {
        if (el.id === 'oes-search') continue;

        if (el.href === baseUrl) {
            el.classList.add("active");
            if (el.parentElement?.tagName === 'LI') {
                el.parentElement.classList.add("active");
            }
        }
        if (el.href === location.href) {
            el.classList.add("current");
            if (el.parentElement?.tagName === 'LI') {
                el.parentElement.classList.add("current");
            }
        }
    }

    // Autofocus and position caret in search input
    const searchBox = document.getElementById('s');
    const caretPos = 10;
    if (searchBox) {
        if (searchBox.createTextRange) {
            const range = searchBox.createTextRange();
            range.move('character', caretPos);
            range.select();
        } else {
            searchBox.focus();
            if (searchBox.selectionStart !== undefined) {
                searchBox.setSelectionRange(caretPos, caretPos);
            }
        }
    }

    // Accordion toggles
    for (const accordion of document.querySelectorAll(".oes-accordion")) {
        accordion.addEventListener("click", () => {
            accordion.classList.toggle("active");
            accordion.nextElementSibling?.classList.toggle("active");
        });
    }
});