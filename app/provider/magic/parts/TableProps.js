import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

export default function(group, element, translate, parameterType) {

  // Only return an entry, if the currently selected
  // element is a start event.

  if (is(element, 'bpmn:StartEvent')) {
    group.entries.push(entryFactory.table(translate, {
      id : parameterType,
      name: 'output',
      labels: ['Name', 'Value'],
      modelProperties: ['Name', 'Value'],
      getElements: () => [
        {
          Name: 'login',
          Value: 'johnAppleseed'
        },
        {
          Name: 'password',
          Value: 'Welcome$123'
        }
      ],

      // updateElement: () => { },
      // removeElement: () => { },
      // addElement: () => { },
      editable: () => { },
      //setControlValue: () => { },
      show: true,

    }));
  }
}