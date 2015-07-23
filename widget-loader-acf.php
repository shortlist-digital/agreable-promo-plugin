<?php

// $config = require_once 'herbert.config.php';
// $ns = $config['agreable_namespace'];

$widget_config = array (
    'key' => 'widget_promo',
    // The 'name' will define the directory that the parent theme looks
    // for our plugin template in. e.g. views/widgets/promo_plugin/template.twig.
    'name' => 'promo_plugin',
    'label' => 'Promo',
    'display' => 'block',
    'sub_fields' => array (
        array (
            'key' => 'widget_promo_promo_post',
            'label' => 'Select a Promo',
            'name' => 'promo_post',
            'prefix' => '',
            'type' => 'post_object',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array (
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'post_type' => array (
                0 => 'promo',
            ),
            'taxonomy' => '',
            'allow_null' => 0,
            'multiple' => 0,
            'return_format' => 'object',
            'ui' => 1,
        ),
    ),
    'min' => '',
    'max' => '',
);

$widget_config["content-types"] = array('post'); // section, article
$widget_config["content-sizes"] = array('main'); // main, main-full-bleed, sidebar
