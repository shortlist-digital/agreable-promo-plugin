<?php

/** @var  \Herbert\Framework\Application $container */

use AgreablePromoPlugin\Hooks\TimberLoaderPaths;
use AgreablePromoPlugin\Hooks\SLMPluginEnqueue;

if(class_exists('AgreablePromoPlugin\Hooks\TimberLoaderPaths')){
  (new TimberLoaderPaths)->init();
}

if(class_exists('AgreablePromoPlugin\Hooks\SLMPluginEnqueue')){
  (new SLMPluginEnqueue)->init();
}


