<?php
namespace AgreablePromoPlugin\Controllers;

use AgreablePromoPlugin\Helper;

class EmailController {

  function __construct($post_data, $post_array){

    /*
     * @AgreablePromoPlugin is a Twig namespace which Herbert generates from
     * values in herbert.config.php.
     * @see http://twig.sensiolabs.org/doc/api.html#loaders
     *
     * Using get_field() which is an ACF function to retrieve theme
     * specific options affecting the style of the promo.
     * ACF definitions for Panel are in app/panels.php.
     */

    $this->post_array = $post_array;
    $this->post_object = new \TimberPost($post_array['ID']);
    // Check we're updating
    if (($post_array['post_status'] == 'publish') && ($this->post_object->post_status == 'publish') && ($this->post_object->post_type == 'promo')) {
      $this->check_if_passport_changed();
    }
  }

  private function check_if_passport_changed() {
    $this->new_passport = json_decode(stripslashes($this->post_array['acf']['selected_passport']));
    $this->old_passport = json_decode($this->post_object->selected_passport);

    if ($this->new_passport->id != $this->old_passport->id) {
      $this->send_warning_email();
    }

  }

  public function build_headers() {
    $headers = "MIME-Version: 1.0\n" ;
    $headers .= "Content-Type: text/html; charset=\"iso-8859-1\"\n";
    $headers .= "X-Priority: 1 (Highest)\n";
    $headers .= "X-MSMail-Priority: High\n";
    $headers .= "Importance: High\n";
    return $headers;
  }

  public function build_message(){
    $time = new \DateTime();
    $time_now = $time->format('Y-m-d H:i:s');
    return view('@AgreablePromoPlugin/email.twig', array(
      'post' => $this->post_object,
      'old_passport' => $this->old_passport->id,
      'new_passport' => $this->new_passport->id,
      'user' => wp_get_current_user()->data,
      'subject' => $this->build_subject(),
      'site' => get_bloginfo(),
      'time' => $time_now,
      'edit_link' => get_edit_post_link($this->post_object->ID),
      'environment' => WP_ENV
    ))->getBody();
  }

  public function send_warning_email() {
    $to_emails = $this->get_admin_email_array();
    $subject = $this->build_subject();
    $message = $this->build_message();
    $headers = $this->build_headers();
    return wp_mail($to_emails, $subject, $message, $headers);
  }

  public function build_subject() {
    switch(WP_ENV) {
      case "production":
        return "WARN: Calais Passport Alert";
        break;
      case "staging":
        return "TEST from staging: Calais Passport Alert";
        break;
      case "development":
        return "TEST from local machine: Calais Passport Alert";
        break;
    }
  }

  public function get_admin_email_array() {
    $admin_emails = array();
    $user_args= array(
      'role' => 'administrator',
      'fields' => array('user_email')
    );
    $users = get_users($user_args);
    foreach($users as $user):
      list($username, $domain) = explode('@', $user->user_email);
      if ($domain == 'shortlist.com'):
        array_push($admin_emails, $user->user_email);
      endif;
   endforeach;
   return $admin_emails;
  }

}

?>
