<?php namespace AgreablePromoPlugin\Controllers;

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
    if (($post_array['post_status'] == 'publish') && ($this->post_object->post_status == 'publish')) {
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
    ob_start();
      print $this->build_subject();
      print "\r\n";
      print "You are receiving this email as the Passport on a live promotion has changed.";
      print "\r\n";
      print "The promotion is '".$this->post_object->title."'.";
      print "\r\n";
      print "The passport for this promotion was previously: ".$this->old_passport->id;
      print "\r\n";
      print "The passport for this promotion was changed to: ".$this->new_passport->id;
      print "\r\n";
      $time = new \DateTime();
      $time_now = $time->format('Y-m-d H:i:s');
      print "The change was made by ".wp_get_current_user()->data->user_login." at ".$time_now.". (This might be off by 1 hour depending on the server)";
      print "\r\n";
      print edit_post_link("Click here to edit the promotion in question.", null, null, $this->post_object->ID);
      if (WP_ENV !== 'production') {
        print "\r\n";
        print "This is a test alert, no further action is neccessary.";
      }
    return ob_get_clean();
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
