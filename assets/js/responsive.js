if (jQuery(window).width() < 600) {
    const $utility = jQuery("ul.oes-utility-nav");
    const $utilityItems = $utility.parent();
    const $searchTrigger = jQuery("#oes-search-panel-trigger");
    const $mainNav = jQuery("ul.oes-main-nav").parent();

    // Swap utility navigation into main nav on mobile
    if ($utilityItems.length && $mainNav.length) {
        $utilityItems.parent().parent().parent().parent().hide();
        $utilityItems.each((_, item) => $mainNav.append(item));
    }

    // Move search trigger into top menus
    if ($utilityItems.length && $searchTrigger.length) {
        jQuery("#oes-top-menus").append($searchTrigger);
        $searchTrigger.children().html(`
            <svg class="search-icon" viewBox="0 0 24 24" width="24" height="24">
                <path d="M13 5c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7l-3.8 3.8 1.1 1.1 3.8-3.8c1 .8 2.3 1.3 3.7 1.3 3.3 0 6-2.7 6-6S16.3 5 13 5zm0 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"></path>
            </svg>
        `);
    }
}