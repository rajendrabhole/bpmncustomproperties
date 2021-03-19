import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';
var cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');

export default function(group, element, translate, dropdownOptions) {
  
  if (is(element, 'bpmn:StartEvent')) {
    var bo = getBusinessObject(element);
    group.entries.push(entryFactory.selectBox(translate, {
      id: 'Connector_Name',
      label: 'Connector Name',
      selectOptions: dropdownOptions,
      modelProperty: 'String',
      emptyParameter: false,

      get: function(element, node) {
        return bo;
      },

      set: function(element, values, node) {
        var bo = cmdHelper.updateBusinessObject(element, node, values);
        return bo;
      },
    }));
  }
}