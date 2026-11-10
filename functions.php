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
    if (!function_exists('OES')) {
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
    oes__theme_enqueue_style('oes');
    oes__theme_enqueue_style('print');
    oes__theme_enqueue_style('responsive');

    wp_enqueue_style('dashicons');

    $minify = function_exists('oes_minify') ? oes_minify() : true;

    oes__theme_enqueue_script('oes', $minify);
    oes__theme_enqueue_script('print', $minify);
    oes__theme_enqueue_script('responsive', $minify);
}

/**
 * Enqueue a single style.
 *
 * @param string $fileName
 * @param string $prefix
 * @return void
 */
function oes__theme_enqueue_style(string $fileName, string $prefix = ''): void
{
    $assets = oes__theme_resolve_asset('css', $fileName, '', $prefix);

    wp_enqueue_style(
        $assets['handle'],
        $assets['url'],
        [],
        $assets['version']);
}

/**
 * Enqueue a single script.
 *
 * @param string $fileName
 * @param string $minify
 * @param string $prefix
 * @return void
 */
function oes__theme_enqueue_script(string $fileName, string $minify, string $prefix = ''): void
{
    $assets = oes__theme_resolve_asset('js', $fileName, $minify, $prefix);

    wp_enqueue_script(
        $assets['handle'],
        $assets['url'],
        [],
        $assets['version'],
        true
    );
}

/**
 * Resolve a theme asset.
 *
 * @param string $type Asset directory and extension: 'css' or 'js'.
 * @param string $name Asset base name without extension.
 * @param string $suffix Suffix such as '.min', or ''.
 * @return array{url: string, version: string|false} URL and cache-busting version.
 */
function oes__theme_resolve_asset(string $type, string $name, string $suffix = '', string $prefix = ''): array
{
    $handle = ($name == 'oes') ? 'oes' : ('oes-' . $prefix. $name);
    $relative = "/assets/{$type}/{$name}{$suffix}.{$type}";

    $filePath = get_theme_file_path($relative);
    $fileUrl  = get_theme_file_uri($relative);

    return [
        'handle'  => $handle,
        'url'     => $fileUrl,
        'version' => file_exists($filePath) ? filemtime($filePath) : false,
    ];
}