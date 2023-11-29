import { useForm } from '@formily/react';

import {
  SchemaInitializerItemOptions,
  useCollectionDataSource,
  useCollectionManager,
  useCompile,
} from '@nocobase/client';
import { CollectionBlockInitializer, getCollectionFieldOptions } from '@nocobase/plugin-workflow/client';
import { NAMESPACE, useLang } from '../locale';

export default {
  title: `{{t("Form event", { ns: "${NAMESPACE}" })}}`,
  type: 'form',
  description: `{{t("Event triggers when submitted a workflow bound form action.", { ns: "${NAMESPACE}" })}}`,
  fieldset: {
    collection: {
      type: 'string',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'CollectionSelect',
      'x-component-props': {
        className: 'auto-width',
      },
      title: `{{t("Form data model", { ns: "${NAMESPACE}" })}}`,
      description: `{{t("Use a collection to match form data.", { ns: "${NAMESPACE}" })}}`,
      ['x-reactions']: [
        {
          target: 'appends',
          effects: ['onFieldValueChange'],
          fulfill: {
            state: {
              value: [],
            },
          },
        },
      ],
    },
    appends: {
      type: 'array',
      title: `{{t("Associations to use", { ns: "${NAMESPACE}" })}}`,
      description: `{{t("Please select the associated fields that need to be accessed in subsequent nodes. With more than two levels of to-many associations may cause performance issue, please use with caution.", { ns: "${NAMESPACE}" })}}`,
      'x-decorator': 'FormItem',
      'x-component': 'AppendsTreeSelect',
      'x-component-props': {
        title: 'Preload associations',
        multiple: true,
        useCollection() {
          const { values } = useForm();
          return values?.collection;
        },
      },
      'x-reactions': [
        {
          dependencies: ['collection'],
          fulfill: {
            state: {
              visible: '{{!!$deps[0]}}',
            },
          },
        },
      ],
    },
  },
  scope: {
    useCollectionDataSource,
  },
  components: {},
  useVariables(config, options) {
    const compile = useCompile();
    const { getCollectionFields } = useCollectionManager();
    const langTriggerData = useLang('Trigger data');
    const langUserSubmittedForm = useLang('User submitted form');
    const rootFields = [
      {
        collectionName: config.collection,
        name: 'data',
        type: 'hasOne',
        target: config.collection,
        uiSchema: {
          title: langTriggerData,
        },
      },
      {
        collectionName: 'users',
        name: 'user',
        type: 'hasOne',
        target: 'users',
        uiSchema: {
          title: langUserSubmittedForm,
        },
      },
    ];
    const result = getCollectionFieldOptions({
      // depth,
      appends: ['data', 'user', ...(config.appends?.map((item) => `data.${item}`) || [])],
      ...options,
      fields: rootFields,
      compile,
      getCollectionFields,
    });
    return result;
  },
  useInitializers(config): SchemaInitializerItemOptions | null {
    if (!config.collection) {
      return null;
    }

    return {
      type: 'item',
      key: 'triggerData',
      title: `{{t("Trigger data", { ns: "${NAMESPACE}" })}}`,
      component: CollectionBlockInitializer,
      collection: config.collection,
      dataSource: '{{$context.data}}',
    };
  },
  initializers: {},
  useActionTriggerable: true,
};