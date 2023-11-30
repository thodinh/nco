import type { Locator, Page } from '@nocobase/test/client';

export class CreateWorkFlow {
  readonly page: Page;
  name: Locator;
  triggerType: Locator;
  description: Locator;
  autoDeleteHistory: Locator;
  submitButton: Locator;
  cancelButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.name = page.getByLabel('block-item-CollectionField-workflows-Name').getByRole('textbox');
    this.triggerType = page.getByTestId('select-single').getByLabel('Search');
    this.description = page.getByTestId('description-item').getByRole('textbox');
    this.autoDeleteHistory = page.getByTestId('select-multiple');
    this.submitButton = page.getByLabel('action-Action-Submit-workflows');
    this.cancelButton = page.getByLabel('action-Action-Cancel-workflows');
  }
}

export class EditWorkFlow {
  readonly page: Page;
  name: Locator;
  statusIsOn: Locator;
  statusIisOff: Locator;
  description: Locator;
  autoDeleteHistory: Locator;
  submitButton: Locator;
  cancelButton: Locator;
  constructor(page: Page, workFlowName: string) {
    this.page = page;
    this.name = page.getByTestId('title-item').getByRole('textbox');
    this.statusIsOn = page.getByLabel('On', { exact: true });
    this.statusIisOff = page.getByLabel('Off');
    this.description = page.getByTestId('description-item').getByRole('textbox');
    this.autoDeleteHistory = page
      .getByTestId('deleteExecutionOnStatus-item')
      .getByTestId('antd-select')
      .locator('div')
      .nth(1);
    this.submitButton = page.getByLabel(`action-Action-Submit-workflows-${workFlowName}`);
    this.cancelButton = page.getByLabel(`action-Action-Cancel-workflows-${workFlowName}`);
  }
}

export class WorkflowManagement {
  readonly page: Page;
  addNewButton: Locator;
  deleteButton: Locator;
  filterButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.addNewButton = page.getByLabel('action-Action-Add new-workflows');
    this.deleteButton = page.getByLabel('action-Action-Delete-workflows');
    this.filterButton = page.getByLabel('action-Filter.Action-Filter-filter-workflows');
  }
}

export class WorkflowListRecords {
  readonly page: Page;
  executionCountPopup: Locator;
  configureAction: Locator;
  editAction: Locator;
  duplicateAction: Locator;
  deleteAction: Locator;
  constructor(page: Page, workFlowName: string) {
    this.page = page;
    this.executionCountPopup = page.getByLabel(`executed-${workFlowName}`);
    this.configureAction = page.getByLabel(`action-WorkflowLink-Configure-workflows-${workFlowName}`);
    this.editAction = page.getByLabel(`action-Action.Link-Edit-workflows-${workFlowName}`);
    this.duplicateAction = page.getByLabel(`action-Action.Link-Duplicate-workflows-${workFlowName}`);
    this.deleteAction = page.getByLabel(`action-Action.Link-Delete-workflows-${workFlowName}`);
  }
}

export class ApprovalTriggerNode {
  readonly page: Page;
  node: Locator;
  nodeTitle: Locator;
  nodeConfigure: Locator;
  collectionDropDown: Locator;
  checkWthdrawable: Locator;
  configureUserInterfaceButton: Locator;
  addBlockButton: Locator;
  addApplyFormMenu: Locator;
  configureFieldsButton: Locator;
  configureActionsButton: Locator;
  saveDraftSwitch: Locator;
  addNodeButton: Locator;
  constructor(page: Page, triggerName: string, collectionName: string) {
    this.page = page;
    this.node = page.getByText('TriggeraConfigure');
    this.nodeTitle = page.locator('textarea').filter({ hasText: triggerName });
    this.nodeConfigure = page.getByRole('button', { name: 'Configure' });
    this.collectionDropDown = page.getByLabel('Search');
    this.checkWthdrawable = page.getByLabel('Withdrawable');
    this.configureUserInterfaceButton = page.getByRole('button', { name: 'Configure user interface' });
    this.addBlockButton = page.getByRole('button', { name: 'Add block' });
    this.addApplyFormMenu = page.getByRole('menuitem', { name: 'Apply form' });
    this.configureFieldsButton = page.getByTestId('configure-fields-button-of-form-item-' + collectionName);
    this.configureActionsButton = page.getByTestId(
      'approval-trigger-configure-form-actions-add-action-button-' + collectionName,
    );
    this.saveDraftSwitch = page.getByRole('menuitem', { name: 'Save draft' }).getByRole('switch');
    this.addNodeButton = page.getByLabel('add-button', { exact: true });
  }
}
export class ApprovalNode {
  readonly page: Page;
  node: Locator;
  nodeTitle: Locator;
  nodeConfigure: Locator;
  assigneesDropDown: Locator;
  checkReturnable: Locator;
  configureUserInterfaceButton: Locator;
  addBlockButton: Locator;
  addApplyFormMenu: Locator;
  configureFieldsButton: Locator;
  configureActionsButton: Locator;
  saveDraftSwitch: Locator;
  addNodeButton: Locator;
  constructor(page: Page, nodeName: string, collectionName: string) {
    this.page = page;
    this.node = page.getByText('TriggeraConfigure');
    this.nodeTitle = page.locator('textarea').filter({ hasText: nodeName });
    this.nodeConfigure = page.getByRole('button', { name: 'Configure' });
    this.assigneesDropDown = page.getByLabel('Search');
    this.checkReturnable = page.getByLabel('Returnable');
    this.configureUserInterfaceButton = page.getByRole('button', { name: 'Configure user interface' });
    this.addBlockButton = page.getByTestId('add-block-button-in-workflow-workflows');
    this.addApplyFormMenu = page.getByRole('menuitem', { name: 'Apply form' });
    this.configureFieldsButton = page.getByTestId('configure-fields-button-of-form-item-' + collectionName);
    this.configureActionsButton = page.getByTestId(
      'approval-trigger-configure-form-actions-add-action-button-' + collectionName,
    );
    this.saveDraftSwitch = page.getByRole('menuitem', { name: 'Save draft' }).getByRole('switch');
    this.addNodeButton = page.getByLabel(`add-button-calculation-${nodeName}`, { exact: true });
  }
}

export class ScheduleTriggerNode {
  readonly page: Page;
  node: Locator;
  nodeTitle: Locator;
  nodeConfigure: Locator;
  customTimeTriggerOptions: Locator;
  startTimeEntryBox: Locator;
  RrpeatModeDropdown: Locator;

  dataTableTimeFieldOptions: Locator;
  collectionDropDown: Locator;
  startTimeDropdown: Locator;
  submitButton: Locator;
  cancelButton: Locator;
  addNodeButton: Locator;
  constructor(page: Page, triggerName: string, collectionName: string) {
    this.page = page;
    this.node = page.getByText('TriggeraConfigure');
    this.nodeTitle = page.locator('textarea').filter({ hasText: triggerName });
    this.nodeConfigure = page.getByRole('button', { name: 'Configure' });
    this.customTimeTriggerOptions = page.getByLabel('Based on certain date');
    this.startTimeEntryBox = page.getByPlaceholder('Select date');
    this.RrpeatModeDropdown = page.getByLabel('block-item-RepeatField-workflows-Repeat mode');

    this.dataTableTimeFieldOptions = page.getByLabel('Based on date field of collection');
    this.collectionDropDown = page.getByTestId('select-collection');
    this.startTimeDropdown = page.getByLabel('block-item-OnField-workflows-Starts on').getByLabel('Search');
    this.submitButton = page.getByLabel('action-Action-Submit-workflows');
    this.cancelButton = page.getByLabel('action-Action-Cancel-workflows');
    this.addNodeButton = page.getByLabel('add-button', { exact: true });
  }
}

export class CollectionTriggerNode {
  readonly page: Page;
  node: Locator;
  nodeTitle: Locator;
  nodeConfigure: Locator;
  collectionDropDown: Locator;
  triggerOnDropdown: Locator;
  submitButton: Locator;
  cancelButton: Locator;
  addNodeButton: Locator;
  constructor(page: Page, triggerName: string, collectionName: string) {
    this.page = page;
    this.node = page.getByLabel(`Trigger-${triggerName}`);
    this.nodeTitle = page.getByLabel(`Trigger-${triggerName}`).getByLabel('textarea');
    this.nodeConfigure = page.getByLabel(`Trigger-${triggerName}`).getByRole('button', { name: 'Configure' });
    this.collectionDropDown = page.getByTestId('select-collection').getByLabel('Search');
    this.triggerOnDropdown = page.getByTestId('select-single').getByLabel('Search');
    this.submitButton = page.getByLabel('action-Action-Submit-workflows');
    this.cancelButton = page.getByLabel('action-Action-Cancel-workflows');
    this.addNodeButton = page.getByLabel('add-button', { exact: true });
  }
}

export class FromEventTriggerNode {
  readonly page: Page;
  node: Locator;
  nodeTitle: Locator;
  nodeConfigure: Locator;
  collectionDropDown: Locator;
  relationalDataDropdown: Locator;
  submitButton: Locator;
  cancelButton: Locator;
  addNodeButton: Locator;
  constructor(page: Page, triggerName: string, collectionName: string) {
    this.page = page;
    this.node = page.getByLabel(`Trigger-${triggerName}`);
    this.nodeTitle = page.getByLabel(`Trigger-${triggerName}`).getByLabel('textarea');
    this.nodeConfigure = page.getByLabel(`Trigger-${triggerName}`).getByRole('button', { name: 'Configure' });
    this.collectionDropDown = page.getByTestId('select-collection');
    this.relationalDataDropdown = page.getByTestId('select-field-Preload associations');
    this.submitButton = page.getByLabel('action-Action-Submit-workflows');
    this.cancelButton = page.getByLabel('action-Action-Cancel-workflows');
    this.addNodeButton = page.getByLabel('add-button', { exact: true });
  }
}

export class ClculationNode {
  readonly page: Page;
  node: Locator;
  nodeTitle: Locator;
  nodeConfigure: Locator;
  staticType: Locator;
  dynamicType: Locator;
  mathCalculationEngine: Locator;
  formulaCalculationEngine: Locator;
  calculationExpression: Locator;
  submitButton: Locator;
  cancelButton: Locator;
  addNodeButton: Locator;
  constructor(page: Page, nodeName: string) {
    this.page = page;
    this.node = page.getByLabel(`Calculation-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Calculation-${nodeName}`, { exact: true }).getByLabel('textarea');
    this.nodeConfigure = page
      .getByLabel(`Calculation-${nodeName}`, { exact: true })
      .getByRole('button', { name: 'Configure' });
    this.staticType = page.getByText('Static', { exact: true });
    this.dynamicType = page.getByText('Dynamic', { exact: true });
    this.mathCalculationEngine = page.getByLabel('Math.js');
    this.formulaCalculationEngine = page.getByLabel('Formula.js');
    this.calculationExpression = page.getByLabel('textbox');
    this.submitButton = page.getByLabel('action-Action-Submit-workflows');
    this.cancelButton = page.getByLabel('action-Action-Cancel-workflows');
    this.addNodeButton = page.getByLabel(`add-button-calculation-${nodeName}`, { exact: true });
  }
}

export class QueryRecordNode {
  readonly page: Page;
  node: Locator;
  nodeTitle: Locator;
  nodeConfigure: Locator;
  collectionDropDown: Locator;
  allowMultipleDataBoxesForResults: Locator;
  addSortFieldsButton: Locator;
  pageNumberEditBox: Locator;
  pageNumberVariableButton: Locator;
  pageSizeEditBox: Locator;
  exitProcessOptionsBoxWithEmptyResult: Locator;
  submitButton: Locator;
  cancelButton: Locator;
  addNodeButton: Locator;
  constructor(page: Page, nodeName: string) {
    this.page = page;
    this.node = page.getByLabel(`Query record-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Query record-${nodeName}`, { exact: true }).getByLabel('textarea');
    this.nodeConfigure = page
      .getByLabel(`Query record-${nodeName}`, { exact: true })
      .getByRole('button', { name: 'Configure' });
    this.collectionDropDown = page.getByTestId('select-collection');
    this.allowMultipleDataBoxesForResults = page.getByLabel('Allow multiple records as');
    this.addSortFieldsButton = page.getByRole('button', { name: 'plus Add sort field' });
    this.pageNumberEditBox = page.getByLabel('variable-constant');
    this.pageNumberVariableButton = page.getByLabel('variable-button');
    this.pageSizeEditBox = page.getByLabel('block-item-InputNumber-workflows-Page size').getByRole('spinbutton');
    this.exitProcessOptionsBoxWithEmptyResult = page.getByLabel('Exit when query result is null');
    this.submitButton = page.getByLabel('action-Action-Submit-workflows');
    this.cancelButton = page.getByLabel('action-Action-Cancel-workflows');
    this.addNodeButton = page.getByLabel(`add-button-query-${nodeName}`, { exact: true });
  }
}

export class CreateRecordNode {
  readonly page: Page;
  node: Locator;
  nodeTitle: Locator;
  nodeConfigure: Locator;
  collectionDropDown: Locator;
  addFieldsButton: Locator;
  submitButton: Locator;
  cancelButton: Locator;
  addNodeButton: Locator;
  constructor(page: Page, nodeName: string) {
    this.page = page;
    this.node = page.getByLabel(`Create record-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Create record-${nodeName}`, { exact: true }).getByLabel('textarea');
    this.nodeConfigure = page
      .getByLabel(`Create record-${nodeName}`, { exact: true })
      .getByRole('button', { name: 'Configure' });
    this.collectionDropDown = page.getByTestId('select-collection');
    this.addFieldsButton = page.getByRole('button', { name: 'plus Add field' });
    this.submitButton = page.getByLabel('action-Action-Submit-workflows');
    this.cancelButton = page.getByLabel('action-Action-Cancel-workflows');
    this.addNodeButton = page.getByLabel(`add-button-create-${nodeName}`, { exact: true });
  }
}

export class AggregateNode {
  readonly page: Page;
  node: Locator;
  nodeTitle: Locator;
  nodeConfigure: Locator;
  countRadio: Locator;
  sumRadio: Locator;
  avgRadio: Locator;
  maxRadio: Locator;
  minRadio: Locator;
  dataTableDataRadio: Locator;
  linkedDataTableDataRadio: Locator;
  collectionDropDown: Locator;
  aggregatedFieldDropDown: Locator;
  submitButton: Locator;
  cancelButton: Locator;
  addNodeButton: Locator;
  constructor(page: Page, nodeName: string) {
    this.page = page;
    this.node = page.getByLabel(`Aggregate-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Aggregate-${nodeName}`, { exact: true }).getByLabel('textarea');
    this.nodeConfigure = page
      .getByLabel(`Aggregate-${nodeName}`, { exact: true })
      .getByRole('button', { name: 'Configure' });
    this.countRadio = page.getByLabel('COUNT');
    this.sumRadio = page.getByLabel('SUM');
    this.avgRadio = page.getByLabel('AVG');
    this.maxRadio = page.getByLabel('MAX');
    this.minRadio = page.getByLabel('MIN');
    this.dataTableDataRadio = page.getByLabel('Data of collection');
    this.linkedDataTableDataRadio = page.getByLabel('Data of associated collection');
    this.collectionDropDown = page.getByTestId('select-collection');
    this.aggregatedFieldDropDown = page.getByRole('combobox', { name: 'Search' });
    this.submitButton = page.getByLabel('action-Action-Submit-workflows');
    this.cancelButton = page.getByLabel('action-Action-Cancel-workflows');
    this.addNodeButton = page.getByLabel(`add-button-aggregate-${nodeName}`, { exact: true });
  }
}

export class ManualNode {
  readonly page: Page;
  node: Locator;
  nodeTitle: Locator;
  nodeConfigure: Locator;
  assigneesDropDown: Locator;
  configureUserInterfaceButton: Locator;
  addBlockButton: Locator;
  triggerDataMenu: Locator;
  nodeDataMenu: Locator;
  customFormMenu: Locator;
  createRecordFormMenu: Locator;
  updateRecordFormMenu: Locator;
  submitButton: Locator;
  cancelButton: Locator;
  addNodeButton: Locator;
  constructor(page: Page, nodeName: string) {
    this.page = page;
    this.node = page.getByLabel(`Manual-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Manual-${nodeName}`, { exact: true }).getByLabel('textarea');
    this.nodeConfigure = page
      .getByLabel(`Manual-${nodeName}`, { exact: true })
      .getByRole('button', { name: 'Configure' });
    this.assigneesDropDown = page.getByTestId('select-single');
    this.configureUserInterfaceButton = page.getByRole('button', { name: 'Configure user interface' });
    this.addBlockButton = page.getByLabel('schema-initializer-Grid-AddBlockButton-workflows');
    this.triggerDataMenu = page.getByLabel('Data blocks-triggerData');
    this.nodeDataMenu = page.getByLabel('nodes', { exact: true });
    this.customFormMenu = page.getByLabel('Form-customForm', { exact: true });
    this.createRecordFormMenu = page.getByLabel('createRecordForm', { exact: true });
    this.updateRecordFormMenu = page.getByLabel('updateRecordForm', { exact: true });
    this.submitButton = page.getByLabel('action-Action-Submit-workflows');
    this.cancelButton = page.getByLabel('action-Action-Cancel-workflows');
    this.addNodeButton = page.getByLabel(`add-button-manual-${nodeName}`, { exact: true });
  }
}

export class ConditionYesNode {
  readonly page: Page;
  node: Locator;
  nodeTitle: Locator;
  nodeConfigure: Locator;
  basicRadio: Locator;
  mathRadio: Locator;
  formulaRadio: Locator;
  submitButton: Locator;
  cancelButton: Locator;
  addNodeButton: Locator;
  constructor(page: Page, nodeName: string) {
    this.page = page;
    this.node = page.getByLabel(`Condition-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Condition-${nodeName}`, { exact: true }).getByLabel('textarea');
    this.nodeConfigure = page
      .getByLabel(`Condition-${nodeName}`, { exact: true })
      .getByRole('button', { name: 'Configure' });
    // await page.getByLabel('variable-constant').first().click();
    // await page.getByLabel('variable-button').first().click();
    // await page.getByLabel('select-operator-calc').first().click();
    // await page.getByRole('option', { name: '=' }).click();
    // await page.getByLabel('variable-constant').nth(1).click();
    // await page.getByLabel('variable-button').nth(1).click();
    this.basicRadio = page.getByLabel('Basic');
    this.mathRadio = page.getByLabel('Math.js');
    this.formulaRadio = page.getByLabel('Formula.js');
    this.submitButton = page.getByLabel('action-Action-Submit-workflows');
    this.cancelButton = page.getByLabel('action-Action-Cancel-workflows');
    this.addNodeButton = page.getByLabel(`add-button-condition-${nodeName}`, { exact: true });
  }
}

export class ConditionBranchNode {
  readonly page: Page;
  node: Locator;
  nodeTitle: Locator;
  nodeConfigure: Locator;
  basicRadio: Locator;
  mathRadio: Locator;
  formulaRadio: Locator;
  submitButton: Locator;
  cancelButton: Locator;
  addNoBranchNode: Locator;
  addYesBranchNode: Locator;
  addNodeButton: Locator;
  constructor(page: Page, nodeName: string) {
    this.page = page;
    this.node = page.getByLabel(`Condition-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Condition-${nodeName}`, { exact: true }).getByLabel('textarea');
    this.nodeConfigure = page
      .getByLabel(`Condition-${nodeName}`, { exact: true })
      .getByRole('button', { name: 'Configure' });
    this.submitButton = page.getByLabel('action-Action-Submit-workflows');
    this.cancelButton = page.getByLabel('action-Action-Cancel-workflows');
    this.addNodeButton = page.getByLabel(`add-button-condition-${nodeName}`, { exact: true });
    this.basicRadio = page.getByLabel('Basic');
    this.mathRadio = page.getByLabel('Math.js');
    this.formulaRadio = page.getByLabel('Formula.js');
    this.addNoBranchNode = page.getByLabel(`add-button-condition-${nodeName}-0`);
    this.addYesBranchNode = page.getByLabel(`add-button-condition-${nodeName}-1`);
  }
}
