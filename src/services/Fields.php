<?php

namespace focuslabllc\cheatsheet\services;

use Craft;
use craft\fields\Assets;
use craft\fields\Categories;
use craft\fields\Checkboxes;
use craft\fields\Color;
use craft\fields\Date;
use craft\fields\Dropdown;
use craft\fields\Email;
use craft\fields\Entries;
use craft\fields\Lightswitch;
use craft\fields\Matrix;
use craft\fields\MultiSelect;
use craft\fields\Number;
use craft\fields\PlainText;
use craft\fields\RadioButtons;
use craft\fields\Table;
use craft\fields\Tags;
use craft\fields\Url;
use craft\fields\Users;
use focuslabllc\cheatsheet\Plugin;
use yii\base\BaseObject;

/**
 * Cheat Sheet Fields Service
 *
 * @author     Focus Lab, LLC <dev@focuslabllc.com>
 * @copyright  Copyright (c) 2016, Focus Lab, LLC
 * @see        https://github.com/focuslabllc/craft-cheat-sheet
 * @package    cheatsheet
 * @version    2.0.2
 */
class Fields extends BaseObject
{

    /**
     * Just a quick way to grab data
     *
     * @access    public
     * @return    array
     */
    public function getTemplateData(): array
    {
        return $this->dataPrep();
    }
    // End function getTemplateData()


    // --------------------------------------------------------


    private function dataPrep(): array
    {
        $plugin = Plugin::getInstance();
        $fieldsService = Craft::$app->fields;

        $currentContext = Craft::$app->request->getParam('context', 'entry');
        $whitespace = $plugin->settings->cheatSheetWhitespace;
        $whitespace = str_replace('\t', '	', $whitespace);

        return [
            'pageTitle'      => 'Cheat Sheet',
            'version'        => $plugin->version,
            'whitespace'     => $whitespace,
            'groups'         => $fieldsService->getAllGroups(),
            'fields'         => $fieldsService->getAllFields(),
            'currentContext' => $currentContext,
            'tagContexts'    => [
                'asset'  => ['title' => 'Assets', 'tag' => 'asset'],
                'cat'    => ['title' => 'Categories', 'tag' => 'category'],
                'entry'  => ['title' => 'Entries', 'tag' => 'entry'],
                'global' => ['title' => 'Globals', 'tag' => 'globalSet'],
                'tag'    => ['title' => 'Tags', 'tag' => 'tag'],
                'user'   => ['title' => 'Users', 'tag' => 'user']
            ],
            'nativeFieldTypes' => [
                Assets::class,
                Categories::class,
                Checkboxes::class,
                Color::class,
                Date::class,
                Dropdown::class,
                Email::class,
                Entries::class,
                Lightswitch::class,
                Matrix::class,
                MultiSelect::class,
                Number::class,
                PlainText::class,
                RadioButtons::class,
                Table::class,
                Tags::class,
                Url::class,
                Users::class,
            ],
            'csMacros' => [
                // Native fields
                Assets::class => 'cs_Assets',
                Categories::class => 'cs_Categories',
                Checkboxes::class => 'cs_Checkboxes',
                Color::class => 'cs_Color',
                Date::class => 'cs_Date',
                Dropdown::class => 'cs_Dropdown',
                Email::class => 'cs_Email',
                Entries::class => 'cs_Entries',
                Lightswitch::class => 'cs_Lightswitch',
                Matrix::class => 'cs_Matrix',
                MultiSelect::class => 'cs_MultiSelect',
                Number::class => 'cs_Number',
                PlainText::class => 'cs_PlainText',
                RadioButtons::class => 'cs_RadioButtons',
                Table::class => 'cs_Table',
                Tags::class => 'cs_Tags',
                Users::class => 'cs_Users',

                // Plugin fields
                'craft\redactor\Field' => 'cs_Redactor',
                'doublesecretagency\smartmap\fields\Address' => 'cs_SmartMap_Address',
                'rias\positionfieldtype\fields\Position' => 'cs_Position',
            ],
            'remoteAssetRoot' => 'https://shared.focus.build/craft-cheat-sheet/'
        ];
    }
}
