import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

export default function(group, element, translate, parameterType, outputJson) {

  // Only return an entry, if the currently selected
  // element is a start event.

  if (is(element, 'bpmn:StartEvent') || is(element, 'bpmn:Activity')) {
    if(outputJson.length >0)
      {
        group.entries.push(entryFactory.table(translate, {
          id : 'output_parameter',
          name: 'output',
          labels: ['Name', 'Value'],
          modelProperties: ['Name', 'Value'],
          getElements: () => outputJson,

          // updateElement: () => { },
          // removeElement: () => { },
          // addElement: () => { },
          editable: () => { },
          //setControlValue: () => { },
          show: true,
        }));
      }else{
        group.entries.push(entryFactory.label({
          id : 'output_parameter',
          labelText: 'There is no output parameter',
        }));
      }
  }
}