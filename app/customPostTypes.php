<?php

/** @var  \Herbert\Framework\Application $container */

\add_action( 'init', function()
{
    $labels = array(
        'name'                => _x( 'Promos', 'Post Type General Name', 'text_domain' ),
        'singular_name'       => _x( 'Promo', 'Post Type Singular Name', 'text_domain' ),
        'menu_name'           => __( 'Promos', 'text_domain' ),
        'parent_item_colon'   => __( 'Parent Item:', 'text_domain' ),
        'all_items'           => __( 'All Promos', 'text_domain' ),
        'view_item'           => __( 'View Promo', 'text_domain' ),
        'add_new_item'        => __( 'Add New Promo', 'text_domain' ),
        'add_new'             => __( 'Add New', 'text_domain' ),
        'edit_item'           => __( 'Edit Promo', 'text_domain' ),
        'update_item'         => __( 'Update Promo', 'text_domain' ),
        'search_items'        => __( 'Search Promos', 'text_domain' ),
        'not_found'           => __( 'Not found', 'text_domain' ),
        'not_found_in_trash'  => __( 'Not found in Trash', 'text_domain' ),
    );

    $args = array(
      'label'               => __( 'promo', 'text_domain' ),
      'description'         => __( 'Create a promo for an article', 'text_domain' ),
      'labels'              => $labels,
      'supports'            => array( 'title', 'revisions'),
      'taxonomies'          => array(),
      'hierarchical'        => false,
      'public'              => true,
      'show_ui'             => true,
      'show_in_menu'        => true,
      'show_in_nav_menus'   => true,
      'show_in_admin_bar'   => true,
      'menu_position'       => 5,
      'menu_icon'           => 'dashicons-carrot',
      'can_export'          => true,
      'has_archive'         => false,
      'exclude_from_search' => true,
      'publicly_queryable'  => true,
      'capability_type' => 'promo',
      'capabilities' => array(
      'publish_posts' => 'publish_promos',
      'edit_posts' => 'edit_promos',
      'edit_others_posts' => 'edit_others_promos',
      'delete_posts' => 'delete_promos',
      'delete_private_posts' => 'delete_private_promos',
      'delete_others_posts' => 'delete_others_promos',
      'read_private_posts' => 'read_private_promos',
      'edit_post' => 'edit_promo',
      'delete_post' => 'delete_promo',
      'read_post' => 'read_promo',
    ),
    'map_meta_cap' => true,
    );

  \register_post_type('promo', $args);
}
,0);
