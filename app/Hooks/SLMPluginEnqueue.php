<?php namespace AgreablePromoPlugin\Hooks;

use AgreablePromoPlugin\Controllers\RenderController;

class SLMPluginEnqueue {

  public function init() {
    \add_action('agreable_promo_plugin_enqueue', array($this, 'plugin_enqueue'), 10, 0);
  }

  public function plugin_enqueue(){
    $r = new RenderController();
    $r->enqueue();
  }

}
