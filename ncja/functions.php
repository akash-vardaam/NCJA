<?php
/**
 * NCJA Proposal Theme functions and definitions.
 *
 * @package NCJA_Proposal_Theme
 */

if (!defined('ABSPATH')) {
    exit;
}

function ncja_proposal_theme_scripts()
{
    $theme_dir = get_template_directory();
    $theme_uri = get_template_directory_uri();
    $assets_dir = $theme_dir . '/assets';

    $css_file = $assets_dir . '/index.css';
    $js_file = $assets_dir . '/index.js';

    wp_enqueue_style(
        'ncja-proposal-fonts',
        'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400;1,9..40,500&family=Inter:wght@300;400;500;600&display=swap',
        array(),
        null
    );

    wp_enqueue_style('ncja-proposal-style', get_stylesheet_uri(), array('ncja-proposal-fonts'), '1.0.0');

    if (file_exists($css_file)) {
        wp_enqueue_style(
            'ncja-proposal-main',
            $theme_uri . '/assets/index.css',
            array('ncja-proposal-style'),
            filemtime($css_file)
        );
    }

    if (file_exists($js_file)) {
        wp_enqueue_script(
            'ncja-proposal-main',
            $theme_uri . '/assets/index.js',
            array(),
            filemtime($js_file),
            true
        );

        wp_add_inline_script(
            'ncja-proposal-main',
            'window.NCJA_THEME_URI = "' . esc_url($theme_uri) . '";',
            'before'
        );
    }
}
add_action('wp_enqueue_scripts', 'ncja_proposal_theme_scripts');

function ncja_proposal_theme_script_loader_tag($tag, $handle, $src)
{
    if ('ncja-proposal-main' !== $handle) {
        return $tag;
    }

    return '<script type="module" src="' . esc_url($src) . '" id="' . esc_attr($handle) . '-js"></script>';
}
add_filter('script_loader_tag', 'ncja_proposal_theme_script_loader_tag', 10, 3);

function ncja_proposal_theme_setup()
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'));
}
add_action('after_setup_theme', 'ncja_proposal_theme_setup');

