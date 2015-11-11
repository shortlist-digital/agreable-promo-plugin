<?php namespace AgreablePromoPlugin\Hooks;

use AgreablePromoPlugin\Helper;

class TimberTwig {

  public function init() {
    \add_filter('timber/loader/paths', array($this, 'addPaths'), 10);
    \add_filter('get_twig', array($this, 'addToTwig'), 10);
  }

  public function addToTwig($twig){
    $twig->addFunction(
      new \Twig_SimpleFunction('generate_code', array($this, 'generate_unique_code'))
    );
    return $twig;
  }

  public function generate_unique_code(){
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $code = '';
    for ($i = 0; $i < 8; $i++) {
      $code .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $code;
  }

  public function addPaths($paths){
    // Get views specified in herbert.
    $namespaces = Helper::get('views');
    foreach ($namespaces as $namespace => $views){
      foreach ((array) $views as $view){
        // Add to timber $paths array.
        array_unshift($paths, $view);
      }
    }
    return $paths;
  }

}
