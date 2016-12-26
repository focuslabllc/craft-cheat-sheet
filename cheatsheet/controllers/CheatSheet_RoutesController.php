<?php
namespace Craft;

/**
 * Craft Cheat Sheet Plugin
 *
 * @author     Focus Lab, LLC <dev@focuslabllc.com>
 * @copyright  Copyright (c) 2016, Focus Lab, LLC
 * @see        https://github.com/focuslabllc/craft-cheat-sheet
 * @package    cheatsheet
 * @version    1.2.0
 */
class CheatSheet_RoutesController extends BaseController
{

	/**
	 * The front-end Cheat Sheet action route
	 */
	public function actionFieldCheatSheet()
	{

		// Only show the cheat sheet if we're in dev mode
		// Otherwise throw a 404 to the browser
		if ( ! craft()->config->get('devMode'))
		{
			exit(craft()->templates->render('404'));
		}

		$templatesPath = craft()->path->getPluginsPath() . 'cheatsheet/templates/frontEnd/';
		craft()->path->setTemplatesPath($templatesPath);

		$templateData = craft()->cheatSheet_fields->getTemplateData();
		$this->renderTemplate('cheatsheet', $templateData);
	}
}