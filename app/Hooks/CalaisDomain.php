<?php namespace AgreablePromoPlugin\Hooks;

use AgreablePromoPlugin\Helper;

class CalaisDomain {

  public function init() {
    add_action( 'wp_head', array($this, 'add_calais_domain_to_window'));
  }

  function add_calais_domain_to_window() {
    $calais_domain = getenv('CALAIS_DOMAIN');
    echo "<script>window.calaisDomain = '$calais_domain';</script>";
  }

}
