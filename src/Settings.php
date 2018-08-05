<?php

namespace focuslabllc\cheatsheet;

use craft\base\Model;

/**
 * Craft Cheat Sheet Plugin
 *
 * @author     Focus Lab, LLC <dev@focuslabllc.com>
 * @copyright  Copyright (c) 2016, Focus Lab, LLC
 * @see        https://github.com/focuslabllc/craft-cheat-sheet
 * @package    cheatsheet
 * @version    2.0.2
 */
class Settings extends Model
{
    /**
     * @var string
     */
    public $cheatSheetRoute;

    /**
     * @var string
     */
    public $cheatSheetWhitespace = '\t';

    /**
     * @var string
     */
    public $cheatSheetUserGroups = [];

    /**
     * @inheritdoc
     */
    public function init()
    {
        if (!$this->cheatSheetRoute) {
            $this->cheatSheetRoute = 'cheatsheet';
        }
    }
}
