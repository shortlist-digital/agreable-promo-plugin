<?php
add_action('admin_init', function() {
remove_role('promos_editor');
  if (!get_role('promos_editor')) {
      // Add promos editor role
      add_role('promos_editor',
        'Promos Editor',
        array(
          'read' => true,
          'edit_pages' => true,
          'delete_pages' => true,
          'publish_pages' => true,
          'upload_files' => true,
        )
      );
    }
    // Add the roles you'd like to administer the custom post types
    $roles = array('promos_editor','administrator');

    // Loop through each role and assign capabilities
    foreach($roles as $the_role) {
      $role = get_role($the_role);
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
      $role->remove_cap('edit_pages');
    }
});