<?php

/** @var  \Herbert\Framework\Application $container */

use AgreablePromoPlugin\Hooks\TimberTwig;
use AgreablePromoPlugin\Hooks\SLMPluginEnqueue;

if(class_exists('AgreablePromoPlugin\Hooks\TimberTwig')){
  (new TimberTwig)->init();
}

if(class_exists('AgreablePromoPlugin\Hooks\SLMPluginEnqueue')){
  (new SLMPluginEnqueue)->init();
}


