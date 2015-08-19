<?php namespace AgreablePromoPlugin\Hooks;

use AgreablePromoPlugin\Helper;
use AgreablePromoPlugin\Controllers\RenderController;
use Herbert\Framework\Enqueue;

class SLMPluginEnqueue {

  public function init() {
    \add_action('agreable_promo_plugin_enqueue', array($this, 'plugin_enqueue'), 10, 0);
  }

  public function plugin_enqueue(){
    $r = new RenderController();
    $r->enqueue();
  }

}
