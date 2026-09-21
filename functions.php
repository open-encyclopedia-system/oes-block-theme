<?php

add_action('after_setup_theme', 'oes__after_setup_theme');
add_action('wp_enqueue_scripts', 'oes__theme_enqueue_scripts', 20);
add_filter('render_block_data', 'oes_redirect_template_parts');

/**
 * Modify the WordPress search to use OES Feature "Search".
 *
 * @return void
 */
function oes__after_setup_theme(): void
{
    if(!function_exists('OES')) {
        return;
    }

    if (OES()->application_initialized && function_exists('oes_theme_modify_search')) {
        oes_theme_modify_search();
    }
}

/**
 * Enqueue application scripts and styles.
 *
 * @return void
 */
function oes__theme_enqueue_scripts(): void
{
    wp_register_style('oes', get_template_directory_uri() . '/assets/css/oes.css');
    wp_enqueue_style('oes');

    wp_register_style('oes-print', get_template_directory_uri() . '/assets/css/print.css');
    wp_enqueue_style('oes-print');

    wp_register_style('oes-responsive', get_template_directory_uri() . '/assets/css/responsive.css');
    wp_enqueue_style('oes-responsive');

    wp_enqueue_style('dashicons');

    $minify = function_exists('oes_minify') ? oes_minify() : true;

    wp_register_script('oes',
        get_template_directory_uri() . '/assets/js/oes' . $minify . '.js',
        [],
        false,
        true);
    wp_enqueue_script('oes');

    wp_register_script('oes-print',
        get_template_directory_uri() . '/assets/js/print' . $minify . '.js',
        [],
        false,
        true);
    wp_enqueue_script('oes-print');

    wp_register_script('oes-responsive',
        get_template_directory_uri() . '/assets/js/responsive' . $minify . '.js',
        [],
        false,
        true);
    wp_enqueue_script('oes-responsive');
}
