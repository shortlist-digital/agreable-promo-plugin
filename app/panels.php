<?php namespace AgreableQuizPlugin;

use AgreableQuizPlugin\Helper;
// $ns = Helper::get('agreable_namespace');
$ns = 'agreable_quiz';

/*
 * Although we're in the Herbert panel file, we're not using any built in
 * panel functionality because you have to write you're own HTML forms and
 * logic. We're using ACF instead but seems sensible to leave ACF logic in
 * here (??).
 */

acf_add_options_sub_page(array(
  'page_title'  => 'Style Settings',
  'menu_title'  => 'Quiz Settings',
  'parent_slug' => 'edit.php?post_type=quiz',
));

// Constructed using (lowercased and hyphenated) 'menu_title' from above.
$options_page_name = 'acf-options-quiz-settings';

if( function_exists('register_field_group') ):

register_field_group(array (
  'key' => 'group_'.$ns.'_plugin',
  'title' => 'Display Settings',
  'fields' => array (
    array (
      'key' => $ns.'_plugin_field_'.$ns.'_primary_color',
      'label' => 'Primary Colour',
      'name' => $ns.'_plugin_settings_property_primary_colour',
      'prefix' => '',
      'type' => 'color_picker',
      'instructions' => '',
      'required' => 0,
      'conditional_logic' => 0,
      'wrapper' => array (
        'width' => '50%',
        'class' => '',
        'id' => '',
      ),
      'default_value' => '#ff00ff',
    ),
    array (
      'key' => $ns.'_plugin_field_'.$ns.'_secondary_plugin',
      'label' => 'Secondary Colour',
      'name' => $ns.'_plugin_settings_property_secondary_colour',
      'prefix' => '',
      'type' => 'color_picker',
      'instructions' => '',
      'required' => 0,
      'conditional_logic' => 0,
      'wrapper' => array (
        'width' => '50%',
        'class' => '',
        'id' => '',
      ),
      'default_value' => '#ffffff',
    ),
    array (
      'key' => $ns.'_plugin_field_'.$ns.'_font_family',
      'label' => 'Font Family',
      'name' => $ns.'_plugin_settings_property_font_family',
      'prefix' => '',
      'type' => 'text',
      'instructions' => '',
      'required' => 0,
      'conditional_logic' => 0,
      'wrapper' => array (
        'width' => '',
        'class' => '',
        'id' => '',
      ),
      'default_value' => '',
      'placeholder' => '',
      'prepend' => '',
      'append' => '',
      'maxlength' => '',
      'readonly' => 0,
      'disabled' => 0,
    ),
    array (
      'key' => $ns.'_plugin_field_'.$ns.'_extra_css',
      'label' => 'Extra CSS',
      'name' => $ns.'_plugin_settings_free_text_css',
      'prefix' => '',
      'type' => 'textarea',
      'instructions' => '',
      'required' => 0,
      'conditional_logic' => 0,
      'wrapper' => array (
        'width' => '',
        'class' => '',
        'id' => '',
      ),
      'default_value' => '',
      'placeholder' => '',
      'maxlength' => '',
      'rows' => '',
      'new_lines' => 'wpautop',
      'readonly' => 0,
      'disabled' => 0,
    ),
  ),
  'location' => array (
    array (
      array (
        'param' => 'options_page',
        'operator' => '==',
        'value' => $options_page_name,
      ),
    ),
  ),
  'menu_order' => 0,
  'position' => 'normal',
  'style' => 'default',
  'label_placement' => 'top',
  'instruction_placement' => 'label',
  'hide_on_screen' => '',
));

endif;
