<?php

/** @var  \Herbert\Framework\Application $container */

use AgreablePromoPlugin\Hooks\TimberTwig;
use AgreablePromoPlugin\Hooks\SLMPluginEnqueue;
use AgreablePromoPlugin\Hooks\SavePost;

(new TimberTwig)->init();
(new SLMPluginEnqueue)->init();
(new SavePost)->init();
