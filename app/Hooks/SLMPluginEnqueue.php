<?php namespace AgreablePromoPlugin\Hooks;

use AgreablePromoPlugin\Helper;
use AgreablePromoPlugin\Controllers\RenderController;
use AgreablePromoPlugin\Controllers\AdminController;
use AgreablePromoPlugin\Controllers\EmailController;
use Herbert\Framework\Enqueue;

class SLMPluginEnqueue {

  public function init() {
    \add_action('agreable_promo_plugin_enqueue', array($this, 'plugin_enqueue'), 10, 0);
    \add_action('admin_init', array($this, 'admin_enqueue'), 10, 0);
    \add_action('wp_insert_post_data', array($this, 'email_enqueue'),  10, 2);
  }

  public function plugin_enqueue(){
    $r = new RenderController();
    $r->enqueue();
  }

  public function admin_enqueue(){
    $a = new AdminController();
    $a->modify_admin();
  }

  public function email_enqueue($post_data, $post_array){
    $email = new EmailController($post_data, $post_array);
    return $post_data;
  }

}
