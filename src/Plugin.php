<?php

namespace focuslabllc\cheatsheet;

use Craft;
use craft\events\RegisterUrlRulesEvent;
use craft\web\UrlManager;
use focuslabllc\cheatsheet\services\Fields;
use yii\base\Event;

/**
 * Craft Cheat Sheet Plugin
 *
 * @author     Focus Lab, LLC <dev@focuslabllc.com>
 * @copyright  Copyright (c) 2016, Focus Lab, LLC
 * @see        https://github.com/focuslabllc/craft-cheat-sheet
 * @package    cheatsheet
 * @version    2.0.2
 *
 * @property Settings $settings
 * @property Fields $fields
 */
class Plugin extends \craft\base\Plugin
{
    /**
     * @inheritdoc
     */
    public $hasCpSettings = true;

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();

        // Set the `fields` component
        $this->set('fields', Fields::class);

        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_SITE_URL_RULES,
            function(RegisterUrlRulesEvent $event) {
                $event->rules[$this->settings->cheatSheetRoute] = 'cheat-sheet/routes/field-cheat-sheet';
            }
        );
    }

    /**
     * @inheritdoc
     */
    protected function createSettingsModel()
    {
        return new Settings();
    }

    /**
     * @inheritdoc
     */
    protected function settingsHtml()
    {
        return Craft::$app->view->renderTemplate('cheat-sheet/settings', [
            'settings' => $this->settings
        ]);
    }
}
