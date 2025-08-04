<?php

add_action('after_setup_theme', 'oes__after_setup_theme');
add_action('wp_enqueue_scripts', 'oes__theme_enqueue_scripts', 20);
add_filter('render_block_data', 'oes__redirect_template_parts');
add_filter('pre_get_document_title', 'oes__document_title');

/**
 * Modify the WordPress search to use OES Feature "Search".
 *
 * @return void
 */
function oes__after_setup_theme(): void
{
    if (function_exists('oes_theme_modify_search')) {
        oes_theme_modify_search();
    }
}

/**
 * Enqueue project scripts and styles.
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

    wp_register_script('oes',
        get_template_directory_uri() . '/assets/js/oes.js',
        ['jquery'],
        false,
        true);
    wp_enqueue_script('oes');
}

/**
 * Redirect template parts according to language.
 *
 * @param array $parsed_block The block data.
 * @return array Return the modified block data.
 */
function oes__redirect_template_parts(array $parsed_block): array
{
    if ('core/template-part' === $parsed_block['blockName'] &&
        in_array($parsed_block['attrs']['slug'], ['header', 'footer'])) {
        global $oes_language;
        if ($oes_language != 'language0') {
            $parsed_block['attrs']['slug'] .= '_' . $oes_language;
        }
    }
    return $parsed_block;
}

/**
 * Modify the document title.
 *
 * @param string $title The document title.
 * @return string Return the modified document title.
 */
function oes__document_title(string $title): string
{
    global $oes_post, $oes_term, $oes_archive;

    if (!empty($oes_post) && isset($oes_post->title)) {
        return wp_strip_all_tags($oes_post->title);
    }

    if (!empty($oes_term) && isset($oes_term->title)) {
        return wp_strip_all_tags($oes_term->title);
    }

    if (!empty($oes_archive) && isset($oes_archive['page_title'])) {
        return wp_strip_all_tags($oes_archive['page_title']);
    }

    return wp_strip_all_tags($title);
}