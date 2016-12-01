<?php
add_action('admin_init', function() {
  if (!get_role('promos_editor')) {
    // Add Promos editor role
    add_role('promos_editor',
      'Promos Editor',
      array(
        'read' => true,
        'edit_posts' => true,
        'delete_posts' => true,
        'publish_posts' => true,
        'upload_files' => true,
      )
    );
  }
  // Add the roles you'd like to administer the custom post types
  $roles = array('promos_editor','administrator');
  // Loop through each role and assign capabilities
  foreach($roles as $role_id) {
    $role = get_role($role_id);
    $role->add_cap('read_promo');
    $role->add_cap('read_private_promos');
    $role->add_cap('edit_promo');
    $role->add_cap('edit_promos');
    $role->add_cap('edit_others_promos');
    $role->add_cap('edit_published_promos');
    $role->add_cap('publish_promos');
    $role->add_cap('delete_others_promos');
    $role->add_cap('delete_private_promos');
    $role->add_cap('delete_published_promos');
  }
get_role($roles[0])->remove_cap('edit_posts');
});
