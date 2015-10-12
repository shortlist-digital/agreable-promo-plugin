<?php


namespace AgreablePromoPlugin\Controllers;
use AgreablePromoPlugin\Helper;


class PromoDownloadController {


  public function build_dropdown(){
    // Get the current context
    $this->context = new \TimberPost();
    // Check we're not in the admin or on a page
    if (!is_admin() && ($this->context->post_type == "post")) {
      // Find the promo ID if there is one
      $promo_id = $this->get_promo_id();
      if ($promo_id) {
        // get the post object for promo
        $this->promo_context = new \TimberPost($promo_id);
        // kick of the menu building process
        $this->build_menu();
      }
    }
    /*
     * @AgreablePromoPlugin is a Twig namespace which Herbert generates from
     * values in herbert.config.php.
     * @see http://twig.sensiolabs.org/doc/api.html#loaders
     *
     * Using get_field() which is an ACF function to retrieve theme
     * specific options affecting the style of the promo.
     * ACF definitions for Panel are in app/panels.php.
     */
  }

  public function get_url($format = 'csv') {
    $url_root = "http://www.calaisapi.com/data-record/";
    $passport_id = json_decode($this->promo_context->selected_passport)->id;
    $search = "/criteria/%7B%22PostId%22:".$this->promo_context->ID."%7D/format/".$format;
    return $url_root.$passport_id.$search;
  }

  public function get_optin_url($index) {
    $url_root = "http://www.calaisapi.com/data-record/";
    $passport_id = json_decode($this->promo_context->selected_passport)->id;
    $search = "/criteria/%7B%22PostId%22:".$this->promo_context->ID.",%20%22ThirdPartyOptIn".$index+1."Value%22:%20true%7D/";
    $format_query = "format/csv";
    return $url_root.$passport_id.$search.$format_query;
  }

  public function build_menu() {
    global $wp_admin_bar;

    $wp_admin_bar->add_menu( array(
      'id'    => 'promo-edit',
      'title' => 'Edit the Promo',
      'href'  => get_edit_post_link($this->promo_context->id)
    ));

    $wp_admin_bar->add_menu( array(
      'id'    => 'promo-downloads',
      'title' => 'Export Promo Entries',
      'href'  => ''
    ));

    $wp_admin_bar->add_menu( array(
      'id'    => 'download-csv',
      'title' => 'Download All - CSV',
      'target' => '_BLANK',
      'href'  => $this->get_url('csv'),
      'parent'=>'promo-downloads'
    ));

    $wp_admin_bar->add_menu( array(
      'id'    => 'download-json',
      'title' => 'Download All - JSON',
      'target' => '_BLANK',
      'href'  => $this->get_url('json'),
      'parent'=>'promo-downloads'
    ));

    for($i = 0; $i < 3; $i++) {
      $property = "third_party_optins_".$i."_optin_name";
      if (isset($this->promo_context->$property)) {
        $this->add_optin_download($this->promo_context->$property, $i);
      }
    }

  }

  public function add_optin_download($promo_name, $index){
    global $wp_admin_bar;
    $promo_slug = sanitize_title($promo_name);
    $wp_admin_bar->add_menu( array(
      'id'    => "download-".$promo_slug,
      'title' => "Download ".$promo_name." Optins - CSV",
      'target' => '_BLANK',
      'href'  => $this->get_optin_url($index),
      'parent'=>'promo-downloads'
    ));
  }

  public function get_promo_id() {
    $promo_id = false;
    $widgets = $this->context->article_widgets;
    foreach($widgets as $index => $widget):
      if ($widget == 'promo_plugin'):
        $property = "article_widgets_".$index."_promo_post";
        $promo_id = $this->context->$property;
      endif;
    endforeach;
    return $promo_id;
  }

}
