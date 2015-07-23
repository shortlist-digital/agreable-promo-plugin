<?php

/** @var  \Herbert\Framework\Application $container */

\add_action( 'init', function()
{
    $labels = array(
        'name'                => _x( 'Quizzes', 'Post Type General Name', 'text_domain' ),
        'singular_name'       => _x( 'Quiz', 'Post Type Singular Name', 'text_domain' ),
        'menu_name'           => __( 'Quizzes', 'text_domain' ),
        'parent_item_colon'   => __( 'Parent Item:', 'text_domain' ),
        'all_items'           => __( 'All Quizzes', 'text_domain' ),
        'view_item'           => __( 'View Quiz', 'text_domain' ),
        'add_new_item'        => __( 'Add New Quiz', 'text_domain' ),
        'add_new'             => __( 'Add New', 'text_domain' ),
        'edit_item'           => __( 'Edit Quiz', 'text_domain' ),
        'update_item'         => __( 'Update Quiz', 'text_domain' ),
        'search_items'        => __( 'Search Quizzes', 'text_domain' ),
        'not_found'           => __( 'Not found', 'text_domain' ),
        'not_found_in_trash'  => __( 'Not found in Trash', 'text_domain' ),
    );

    $args = array(
      'label'               => __( 'quiz', 'text_domain' ),
      'description'         => __( 'Create a quiz for an article', 'text_domain' ),
      'labels'              => $labels,
      'supports'            => array( 'title', 'revisions'),
      'taxonomies'          => array(),
      'hierarchical'        => false,
      'public'              => false,
      'show_ui'             => true,
      'show_in_menu'        => true,
      'show_in_nav_menus'   => true,
      'show_in_admin_bar'   => true,
      'menu_position'       => 5,
      'menu_icon'           => 'dashicons-forms',
      'can_export'          => true,
      'has_archive'         => false,
      'exclude_from_search' => true,
      'publicly_queryable'  => true,
      'capability_type'     => 'page',
    );

  \register_post_type('quiz', $args);
}
,0);
