<?php namespace AgreablePromoPlugin\Hooks;

use AgreablePromoPlugin\Helper;

class SavePost {

  public function init() {
    \add_action( 'save_post', array($this, 'update_post_times'), 10, 2 );
    // \add_action( 'before_delete_post', array($this, 'remove_post_times'), 10, 1 );
  }

  public function posts_where_widgets( $where ) {
    $where = str_replace("meta_key = 'article_widgets_%", "meta_key LIKE 'article_widgets_%", $where);
    return $where;
  }

  public function  update_post_times($post_id, $post){

    if ($post->post_type != 'promo'){
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
      update_field('end_time', $end_time, $p->ID);
      update_field('start_time', $start_time, $p->ID);
    }
  }

}
