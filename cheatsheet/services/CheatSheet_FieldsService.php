<?php
namespace Craft;

/**
 * Cheat Sheet Fields Service
 *
 * @author     Focus Lab, LLC <dev@focuslabllc.com>
 * @copyright  Copyright (c) 2016, Focus Lab, LLC
 * @see        https://github.com/focuslabllc/craft-cheat-sheet
 * @package    cheatsheet
 * @version    1.2.0
 */

class CheatSheet_FieldsService extends BaseApplicationComponent
{

	/**
	 * Just a quick way to grab data
	 *
	 * @access    public
	 * @return    array
	 */
	public function getTemplateData()
	{
		return $this->dataPrep();
	}
	// End function getTemplateData()



	// --------------------------------------------------------



	private function dataPrep()
	{
		$currentContext = craft()->request->getParam('context') ?: 'entry';
		$whitespace     = craft()->plugins->getPlugin('cheatsheet')->getSettings()->getAttribute('cheatSheetWhitespace');
		$whitespace = str_replace('\t', '	', $whitespace);

		return [
			'pageTitle'      => 'Field Cheat Sheet',
			'version'        => craft()->plugins->getPlugin('cheatsheet')->getVersion(),
			'whitespace'     => $whitespace,
			'groups'         => craft()->fields->getAllGroups(),
			'fields'         => craft()->fields->getAllFields(),
			'currentContext' => $currentContext,
			'tagContexts'    => [
				'asset'  => ['title' => 'Assets',     'tag' => 'asset' ],
				'cat'    => ['title' => 'Categories', 'tag' => 'category'],
				'entry'  => ['title' => 'Entries',    'tag' => 'entry'],
				'global' => ['title' => 'Globals',    'tag' => 'globalSet'],
				'tag'    => ['title' => 'Tags',       'tag' => 'tag'],
				'user'   => ['title' => 'Users',      'tag' => 'user']
			],
			'nativeFieldTypes' => [
				'Assets',
				'Categories',
				'Checkboxes',
				'Color',
				'Date',
				'Dropdown',
				'Entries',
				'Lightswitch',
				'Matrix',
				'MultiSelect',
				'Number',
				'PlainText',
				'PositionSelect',
				'RadioButtons',
				'RichText',
				'Table',
				'Tags',
				'Users'
			],
			'remoteAssetRoot' => 'http://shared.focus.build/craft-cheat-sheet/'
		];
	}
}