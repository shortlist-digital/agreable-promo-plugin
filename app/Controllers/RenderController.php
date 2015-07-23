<?php namespace AgreableQuizPlugin\Controllers;

use AgreableQuizPlugin\Helper;

class RenderController {

  public function enqueue(){

    // Enqueue scripts.
    wp_enqueue_script( 'agreable_quiz_script', Helper::assetUrl('app.js'), array(), '1.0.0', true );

    /*
     * @AgreableQuizPlugin is a Twig namespace which Herbert generates from
     * values in herbert.config.php.
     * @see http://twig.sensiolabs.org/doc/api.html#loaders
     *
     * Using get_field() which is an ACF function to retrieve theme
     * specific options affecting the style of the quiz.
     * ACF definitions for Panel are in app/panels.php.
     */

    $ns = Helper::get('agreable_namespace');
    echo view('@AgreableQuizPlugin/styles.twig', [
        'common_css_path'   => Helper::asset('styles.css'),
        'plugin_settings_property_primary_colour'      => get_field($ns.'_plugin_settings_property_primary_colour', 'option'),
        'plugin_settings_property_secondary_colour'    => get_field($ns.'_plugin_settings_property_secondary_colour', 'option'),
        'plugin_settings_property_font_family'         => get_field($ns.'_plugin_settings_property_font_family', 'option'),
        'plugin_settings_free_text'                    => get_field($ns.'_plugin_settings_free_text_css', 'option'),
    ])->getBody();
  }

}
