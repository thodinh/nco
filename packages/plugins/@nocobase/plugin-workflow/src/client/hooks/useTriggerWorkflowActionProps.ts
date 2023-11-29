import { useNavigate } from 'react-router-dom';
import { App, message } from 'antd';
import { useField, useFieldSchema, useForm } from '@formily/react';

import {
  useAPIClient,
  useActionContext,
  useBlockRequestContext,
  useCollection,
  useCompile,
  useCurrentUserContext,
  useFilterByTk,
  useFormActiveFields,
  useRecord,
} from '@nocobase/client';
import { parse, isURL } from '@nocobase/utils/client';
import { omit } from 'lodash';

function getFormValues({
  filterByTk,
  form,
  getField,
  actionFields,
}: {
  filterByTk;
  form;
  getField;
  actionFields: any[];
}) {
  if (filterByTk) {
    if (actionFields) {
      const keys = Object.keys(form.values).filter((key) => {
        const f = getField(key);
        return !actionFields.includes(key) && ['hasOne', 'hasMany', 'belongsTo', 'belongsToMany'].includes(f?.type);
      });
      return omit({ ...form.values }, keys);
    }
  }

  return form.values;
}

export function useTriggerWorkflowsActionProps() {
  const api = useAPIClient();
  const form = useForm();
  const { field, resource, __parent } = useBlockRequestContext();
  const { setVisible, fieldSchema } = useActionContext();
  const navigate = useNavigate();
  const actionSchema = useFieldSchema();
  const actionField = useField();
  const { fields, getField, getTreeParentField } = useCollection();
  const compile = useCompile();
  const filterByTk = useFilterByTk();
  const currentRecord = useRecord();
  const currentUserContext = useCurrentUserContext();
  const { modal } = App.useApp();
  const { getActiveFieldsName } = useFormActiveFields() || {};

  const currentUser = currentUserContext?.data?.data;
  const filterKeys = actionField.componentProps.filterKeys || [];

  return {
    async onClick() {
      const {
        assignedValues: originalAssignedValues = {},
        onSuccess,
        overwriteValues,
        skipValidator,
        triggerWorkflows,
      } = actionSchema?.['x-action-settings'] ?? {};
      const addChild = fieldSchema?.['x-component-props']?.addChild;
      const assignedValues = parse(originalAssignedValues)({
        // @deprecated
        currentTime: new Date(),
        // @deprecated
        currentRecord,
        // @deprecated
        currentUser,
        $user: currentUser,
        $nRecord: currentRecord,
        $nForm: form.values,
        $nDate: {
          now: new Date(),
        },
      });
      if (!skipValidator) {
        await form.submit();
      }
      const values = getFormValues({ filterByTk, form, getField, actionFields: getActiveFieldsName?.('form') || [] });
      // const values = omitBy(formValues, (value) => isEqual(JSON.stringify(value), '[{}]'));
      if (addChild) {
        const treeParentField = getTreeParentField();
        values[treeParentField?.name ?? 'parent'] = currentRecord;
        values[treeParentField?.foreignKey ?? 'parentId'] = currentRecord.id;
      }
      actionField.data = field.data || {};
      actionField.data.loading = true;
      try {
        const data = await api.resource('workflows').trigger({
          values: {
            ...values,
            ...overwriteValues,
            ...assignedValues,
          },
          filterKeys: filterKeys,
          // TODO(refactor): should change to inject by plugin
          triggerWorkflows: triggerWorkflows?.length
            ? triggerWorkflows.map((row) => [row.workflowKey, row.context].filter(Boolean).join('!')).join(',')
            : undefined,
        });
        actionField.data.loading = false;
        actionField.data.data = data;
        __parent?.service?.refresh?.();
        setVisible?.(false);
        if (!onSuccess?.successMessage) {
          return;
        }
        if (onSuccess?.manualClose) {
          modal.success({
            title: compile(onSuccess?.successMessage),
            onOk: async () => {
              await form.reset();
              if (onSuccess?.redirecting && onSuccess?.redirectTo) {
                if (isURL(onSuccess.redirectTo)) {
                  window.location.href = onSuccess.redirectTo;
                } else {
                  navigate(onSuccess.redirectTo);
                }
              }
            },
          });
        } else {
          message.success(compile(onSuccess?.successMessage));
        }
      } catch (error) {
        actionField.data.loading = false;
      }
    },
  };
}