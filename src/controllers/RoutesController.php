<?php

namespace focuslabllc\cheatsheet\controllers;

use Craft;
use craft\web\Controller;
use craft\web\View;
use focuslabllc\cheatsheet\assets\CheatSheetAsset;
use focuslabllc\cheatsheet\Plugin;
use yii\web\NotFoundHttpException;

/**
 * Craft Cheat Sheet Plugin
 *
 * @author     Focus Lab, LLC <dev@focuslabllc.com>
 * @copyright  Copyright (c) 2016, Focus Lab, LLC
 * @see        https://github.com/focuslabllc/craft-cheat-sheet
 * @package    cheatsheet
 * @version    2.0.2
 */
class RoutesController extends Controller
{
    /**
     * The front-end Cheat Sheet action route
     *
     * @throws NotFoundHttpException
     */
    public function actionFieldCheatSheet()
    {
        // Only show the cheat sheet if we're in dev mode
        // Otherwise throw a 404 to the browser
        if (!YII_DEBUG) {
            throw new NotFoundHttpException();
        }

        $plugin = Plugin::getInstance();

        $view = Craft::$app->view;
        $view->setTemplateMode(View::TEMPLATE_MODE_CP);
        $view->setTemplatesPath($plugin->getBasePath() . '/templates/frontEnd');
        $view->registerAssetBundle(CheatSheetAsset::class);

        $templateData = $plugin->fields->getTemplateData();
        return $this->renderTemplate('cheatsheet', $templateData);
    }
}
