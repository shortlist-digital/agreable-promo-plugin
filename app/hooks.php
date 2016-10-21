<?php

/** @var  \Herbert\Framework\Application $container */

use AgreablePromoPlugin\Hooks\TimberTwig;
use AgreablePromoPlugin\Hooks\SLMPluginEnqueue;
use AgreablePromoPlugin\Hooks\SavePost;
use AgreablePromoPlugin\Hooks\CalaisDomain;

(new TimberTwig)->init();
(new SLMPluginEnqueue)->init();
(new CalaisDomain)->init();
(new SavePost)->init();
