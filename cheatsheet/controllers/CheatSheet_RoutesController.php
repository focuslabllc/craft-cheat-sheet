<?php
namespace Craft;

class CheatSheet_RoutesController extends BaseController
{
	public function actionFieldCheatSheet()
	{

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