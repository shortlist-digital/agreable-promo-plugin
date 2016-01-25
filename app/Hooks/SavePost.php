<?php namespace AgreablePromoPlugin\Hooks;

use AgreablePromoPlugin\Helper;

class SavePost {

  public function init() {
    // These two hooks are doing (almost) the same thing but from the inverse association.
    // i.e. one works from promo and finds assocated post(s) and the other works
    // from posts and finds associated promo.

    // Hook attached to save_post action filtered by 'promo' post typ.
    \add_action('save_post', array($this, 'promo_sync_times_to_posts'), 10, 2 );
    // Hook attached to acf save_post with  high priority so that it occurs.
    \add_filter('acf/save_post', array($this, 'post_sync_times_from_promo'), 15, 3);
  }

  /*
   * This hook targets a post.
   * Takes start and end time from promo and adds to post object. If
   * promo doesn't exist in article_widgets we delete postmeta.
   */
  function post_sync_times_from_promo($post_id){

    $post = get_post($post_id);

    if(!$post || !isset($post->post_type) || $post->post_type !== 'post'){
      return;
    }

    $widgets = get_field('article_widgets', $post_id);

    $promo_id = null;
    foreach($widgets as $w){
      if($w['acf_fc_layout'] === 'promo_plugin'){
        $promo_id = $w['promo_post']->ID;
      }
    }

    // If there  is a promo on this post update time.
    if($promo_id){
      $start_time = get_field('start_time', $promo_id, false);
      $end_time = get_field('end_time', $promo_id,  false);
      update_field('override_end_time', $end_time, $post->ID);
      update_field('override_start_time', $start_time, $post->ID);
    } else {
      update_field('override_end_time', '', $post->ID);
      update_field('override_start_time', '', $post->ID);
    }

  }


  /*
   * This hook targets a promo.
   * Find all posts associated with this promo and adding time
   * to them.
   */
  public function  promo_sync_times_to_posts($post_id, $post){

    if(!$post || !isset($post->post_type) || $post->post_type !== 'promo'){
      return;
    }

    // Get start and end from promo.
    $start_time = get_field('start_time', $post->ID, false);
    $end_time = get_field('end_time', $post->ID,  false);

    // Reverse query to find posts with this promo.
    $query_args = array(
      'posts_per_page' => -1,
      'post_status' => 'publish',
      'meta_query' => array(
        array(
          'key' => 'article_widgets_%_promo_post',
          'value' => $post->ID
        )
      )
    );

    // To accomodate ACF meta_key structure for article_widgets
    // (e.g. article_widgets_{index}_promo_post) we  need to manipulate
    // the SQL so that it is a LIKE comparison.
    \add_filter('posts_where', array($this, 'posts_where_widgets'));

    $posts = new \WP_Query($query_args);

    // Only needs to be applied in this context.
    \remove_filter('posts_where', array($this, 'posts_where_widgets'));

    foreach($posts->posts as $p){
      update_field('override_end_time', $end_time, $p->ID);
      update_field('override_start_time', $start_time, $p->ID);
    }
  }

  public function posts_where_widgets( $where ) {
    $where = str_replace("meta_key = 'article_widgets_%", "meta_key LIKE 'article_widgets_%", $where);
    return $where;
  }

}
