<?php namespace AgreableQuizPlugin\Hooks;

use AgreableQuizPlugin\Controllers\RenderController;

class SLMPluginEnqueue {

  public function init() {
    \add_action('agreable_quiz_plugin_enqueue', array($this, 'plugin_enqueue'), 10, 0);
  }

  public function plugin_enqueue(){
    $r = new RenderController();
    $r->enqueue();
  }

}
