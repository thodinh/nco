import { Plugin } from '@nocobase/server';
import WorkflowPlugin from '@nocobase/plugin-workflow';

import ParallelInstruction from './ParallelInstruction';

export default class extends Plugin {
  workflow: WorkflowPlugin;

  async load() {
    const workflowPlugin = this.app.getPlugin(WorkflowPlugin) as WorkflowPlugin;
    this.workflow = workflowPlugin;
    workflowPlugin.instructions.register('parallel', new ParallelInstruction(workflowPlugin));
  }
}
