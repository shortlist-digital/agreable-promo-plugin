<?php namespace AgreablePromoPlugin\Hooks;

use AgreablePromoPlugin\Helper;
use AgreablePromoPlugin\Controllers\RenderController;
use AgreablePromoPlugin\Controllers\AdminController;
use Herbert\Framework\Enqueue;

class SLMPluginEnqueue {

  public function init() {
    \add_action('agreable_promo_plugin_enqueue', array($this, 'plugin_enqueue'), 10, 0);
    \add_action('admin_init', array($this, 'admin_enqueue'), 10, 0);
  }

  public function plugin_enqueue(){
    $r = new RenderController();
    $r->enqueue();
  }

  public function admin_enqueue(){
    $a = new AdminController();
    $a->modify_admin();

  }

}
