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
class CheatSheetPlugin extends BasePlugin
{

	/**
	 * @access    public
	 * @return    string
	 */
	public function getName()
	{
		return Craft::t('Craft Cheat Sheet');
	}



	/**
	 * @access    public
	 * @return    string
	 */
	public function getVersion()
	{
		return '1.2.1';
	}



	/**
	 * @access    public
	 * @return    string
	 */
	public function getDeveloper()
	{
		return 'Focus Lab, LLC';
	}



	/**
	 * @access    public
	 * @return    string
	 */
	public function getDeveloperUrl()
	{
		return 'http://focuslabllc.com';
	}



	/**
	 * @access    public
	 * @return    string
	 */
	public function getDocumentationUrl() {
		return 'https://github.com/focuslabllc/craft-cheat-sheet/blob/master/readme.md';
	}



	/**
	 * @access    public
	 * @return    string
	 */
	public function getReleaseFeedUrl() {
		return 'https://raw.githubusercontent.com/focuslabllc/craft-cheat-sheet/master/changelog.json';
	}



	/**
	 * @access    public
	 * @return    bool
	 */
	public function hasCpSection()
	{
		return false;
	}



	/**
	 * @access    public
	 * @see       https://craftcms.com/classreference/etc/components/BaseSavableComponentType#defineSettings-detail
	 * @return    array
	 */
	protected function defineSettings()
	{
		return array(
			'cheatSheetRoute'      => array(AttributeType::String, 'default' => 'cheatsheet'),
			'cheatSheetWhitespace' => array(AttributeType::String, 'default' => '\t'),
			'cheatSheetUserGroups' => array(AttributeType::Mixed,  'default' => []),
		);
	}



	/**
	 * @access    public
	 * @see       https://craftcms.com/classreference/etc/components/ISavableComponentType#getSettingsHtml-detail
	 * @return    string
	 */
	public function getSettingsHtml()
	{
		return craft()->templates->render('cheatsheet/settings', array(
			'settings' => $this->getSettings()
		));
	}



	/**
	 * @access    public
	 * @see       https://craftcms.com/docs/plugins/hooks-reference#registerSiteRoutes
	 * @return    array
	 */
	public function registerSiteRoutes()
	{
		$customCheatSheetRoute = $this->getSettings()->getAttribute('cheatSheetRoute');
		$cheatSheetRoute = empty($customCheatSheetRoute) ? 'cheatsheet' : $customCheatSheetRoute;

		return array(
			$cheatSheetRoute => array('action' => 'cheatSheet/routes/fieldCheatSheet')
		);
	}

}
