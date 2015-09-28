<?php namespace AgreablePromoPlugin\Controllers;

use AgreablePromoPlugin\Helper;

class AdminController {

  public function modify_admin(){

    /*
     * @AgreablePromoPlugin is a Twig namespace which Herbert generates from
     * values in herbert.config.php.
     * @see http://twig.sensiolabs.org/doc/api.html#loaders
     *
     * Using get_field() which is an ACF function to retrieve theme
     * specific options affecting the style of the promo.
     * ACF definitions for Panel are in app/panels.php.
     */

    \Jigsaw::add_column('promo', 'Passport', function($pid){
      // This is a render callback
      $data = array();
      $data = new \TimberPost($pid);
      echo json_decode($data->selected_passport)->id;
    }, 5);

  }

}
