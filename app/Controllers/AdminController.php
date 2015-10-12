<?php

namespace AgreablePromoPlugin\Controllers;
use AgreablePromoPlugin\Helper;

use GuzzleHttp\Client;

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

     $this->add_passport_column();
     $this->add_count_column();
     $this->add_status_column();

  }

  public function build_url($passport_id, $post_id) {
    $base = "http://www.calaisapi.com/data-record/".$passport_id."/criteria/%7B%22PostId%22:".$post_id."%7D/count";
    return $base;
  }

  public function add_count_column() {
    \Jigsaw::add_column('promo', 'Entries', function($pid){
      // This is a render callback
      $data = new \TimberPost($pid);
      if (null !== json_decode($data->selected_passport)) {
        $passport_id = json_decode($data->selected_passport)->id;
        $url = $this->build_url($passport_id, $data->ID);
        echo "<span class='count-column' data-url='$url'>Loading Count...</span>";
      } else {
        echo "N/A";
      }
    }, 5);
  }

  public function add_status_column() {
    \Jigsaw::add_column('promo', 'Status', function($pid){
    $start_time =  get_field("start_time", $pid);
    $end_time = get_field("end_time", $pid);
    if (isset($start_time) && isset($end_time)) {
      if (($start_time < time()) && ($end_time > time())) {
        echo "<span style='color:green;'>Running</san>";
      }
      else if (time() > $end_time) {
        echo "<span>Ended</span>";
      }
      else if ($start_time > time()) {
        echo "<span style='color:orange;'>Starts soon</span>";
      }
    } else {
      echo "N/A";
    }
    }, 5);
  }

  public function add_passport_column() {

    \Jigsaw::add_column('promo', 'Passport', function($pid){
      // This is a render callback
      $data = array();
      $data = new \TimberPost($pid);
      if (null !== json_decode($data->selected_passport)) {
        $object = json_decode($data->selected_passport);
        echo isset($object->title) ? $object->title : $object->id;
      } else {
        echo "No Passport";
      }
    }, 5);

  }

}
