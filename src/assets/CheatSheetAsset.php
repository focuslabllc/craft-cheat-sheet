<?php

namespace focuslabllc\cheatsheet\assets;

use craft\web\AssetBundle;

/**
 * Craft Cheat Sheet Plugin
 *
 * @author     Focus Lab, LLC <dev@focuslabllc.com>
 * @copyright  Copyright (c) 2016, Focus Lab, LLC
 * @see        https://github.com/focuslabllc/craft-cheat-sheet
 * @package    cheatsheet
 * @version    2.0.2
 */
class CheatSheetAsset extends AssetBundle
{
    /**
     * @inheritdoc
     */
    public $sourcePath = __DIR__ . '/dist';

    /**
     * @inheritdoc
     */
    public $css = [
        'css/styles.css',
    ];

    /**
     * @inheritdoc
     */
    public $js = [
        'js/scripts.js',
    ];
}
