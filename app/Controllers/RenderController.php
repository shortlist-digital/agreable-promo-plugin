<?php namespace AgreablePromoPlugin\Controllers;

use AgreablePromoPlugin\Helper;
use \Exception;

class RenderController {

  public function enqueue(){

    /*
     * @AgreablePromoPlugin is a Twig namespace which Herbert generates from
     * values in herbert.config.php.
     * @see http://twig.sensiolabs.org/doc/api.html#loaders
     *
     * Using get_field() which is an ACF function to retrieve theme
     * specific options affecting the style of the promo.
     * ACF definitions for Panel are in app/panels.php.
     */

    $ns = Helper::get('agreable_namespace');

    $plugin_root = realpath(__DIR__ . '/../..');
    $js_string = file_get_contents($plugin_root . '/resources/assets/app.js');
    $webpack_port = null;
    $environment = getenv('WP_ENV');

    if ($environment === 'development') {
      try {
        $webpack_port = $this->getDevelopmentWebpackPort($plugin_root);
      } catch(Exception $e) {
        // If exception the developer hasn't run webpack so may not be
        // 'developing' this particular plugin, force 'production'
        $environment = 'production';
      }
    }

    echo view('@AgreablePromoPlugin/files.twig', [
      'environment' => $environment,
      'common_css_path'   => Helper::asset('styles.css'),
      'js_string' =>  $js_string,
      'webpack_port' => $webpack_port,
      'plugin_settings_property_primary_colour'      => get_field($ns.'_plugin_settings_property_primary_colour', 'option'),
      'plugin_settings_property_secondary_colour'    => get_field($ns.'_plugin_settings_property_secondary_colour', 'option'),
      'plugin_settings_property_font_family'         => get_field($ns.'_plugin_settings_property_font_family', 'option'),
      'plugin_settings_free_text'                    => get_field($ns.'_plugin_settings_free_text_css', 'option'),
    ])->getBody();
  }

  function getDevelopmentWebpackPort($plugin_root) {
    $port_file = 'webpack-current-port.tmp';
    $port_file_location = $plugin_root . '/' . $port_file;
    if (!file_exists($port_file_location)) {
      throw new Exception('Expected ' . $port_file . ' to be available.');
    }

    return file_get_contents($port_file_location);
  }

}
