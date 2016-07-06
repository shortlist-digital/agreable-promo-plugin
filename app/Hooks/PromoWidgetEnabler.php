<?php namespace AgreablePromoPlugin\Hooks;

use AgreablePromoPlugin\Helper;

class PromoWidgetEnabler {

  public function init() {
    \add_action('add_promo_to_users', array($this, 'add_promo_widget'), 1000, 1 );
  }
  public function add_promo_widget() {
    // $wp_roles gets every user role and adds the promo type as a capability
    global $wp_roles;
    $wp_roles->add_cap('edit_promo',true);
    $wp_roles->add_cap('edit_promos',true);
    $wp_roles->add_cap('edit_other_promos',true);
    $wp_roles->add_cap('publish_promos',true);
    $wp_roles->add_cap('read_promo',true);
    $wp_roles->add_cap('read_private_promos',true);
    $wp_roles->add_cap('delete_promo',true);
  }
}
