<?php

/** @var  \Herbert\Framework\Application $container */

use AgreableQuizPlugin\Hooks\TimberLoaderPaths;
use AgreableQuizPlugin\Hooks\SLMPluginEnqueue;

if(class_exists('AgreableQuizPlugin\Hooks\TimberLoaderPaths')){
  (new TimberLoaderPaths)->init();
}

if(class_exists('AgreableQuizPlugin\Hooks\SLMPluginEnqueue')){
  (new SLMPluginEnqueue)->init();
}


