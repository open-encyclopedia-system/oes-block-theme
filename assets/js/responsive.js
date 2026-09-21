if (window.innerWidth < 600) {

    const utilityList = document.querySelector("ul.oes-utility-nav");
    const utilityItems = utilityList?.parentElement;
    const searchTrigger = document.getElementById("oes-search-panel-trigger");
    const mainNav = document.querySelector("ul.oes-main-nav")?.parentElement;

    // Swap utility navigation into main nav on mobile
    if (utilityItems && mainNav) {
        const hideTarget = utilityItems.parentElement?.parentElement?.parentElement?.parentElement;
        if (hideTarget) hideTarget.style.display = "none";
        for (const item of utilityItems.children) {
            mainNav.append(item);
        }
    }

    // Move search trigger into top menus
    const topMenus = document.getElementById("oes-top-menus");
    if (utilityItems && searchTrigger && topMenus) {
        topMenus.append(searchTrigger);
        const firstChild = searchTrigger.firstElementChild;
        if (firstChild) {
            firstChild.innerHTML = `
                <svg class="search-icon" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M13 5c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7l-3.8 3.8 1.1 1.1 3.8-3.8c1 .8 2.3 1.3 3.7 1.3 3.3 0 6-2.7 6-6S16.3 5 13 5zm0 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"></path>
                </svg>
            `;
        }
    }
}