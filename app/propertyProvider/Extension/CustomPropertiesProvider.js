import inherits from 'inherits';

import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';

// Require all properties you need from existing providers.
// In this case all available bpmn relevant properties without camunda extensions.
import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';
import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps';
import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps';
import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps';
import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps';


// Require your custom property entries.
import inputConnectorProps from './parts/InputProps';
import inputSocketProps from './parts/InputProps';
import outputProps from './parts/OutputProps';
var dropdownJson = [ { value: 0, name: 'Select' }, {value: 1, name: 'Xyz' }, { value: 2, name: 'Xyz1'}, { value: 3, name: 'Xyz2' }, { value: 4, name: 'Xyz3' }];
var dropdownJson1 = [ { value: 0, name: 'Select' }, { value: 1, name: 'Abc' }, { value: 2, name: 'Abc1'}, { value: 3, name: 'Abc2' }, { value: 4, name: 'Abc3' }];
var outputJson = [ {Name: 'login',Value: 'johnAppleseed'}, {Name: 'password', Value: 'Welcome$123'}];

// The general tab contains all bpmn relevant properties.
// The properties are organized in groups.
function createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate) {

  var generalGroup = {
    id: 'general',
    label: 'General',
    entries: []
  };
  idProps(generalGroup, element, translate);
  nameProps(generalGroup, element, bpmnFactory, canvas, translate);
  processProps(generalGroup, element, translate);

  var detailsGroup = {
    id: 'details',
    label: 'Details',
    entries: []
  };
  linkProps(detailsGroup, element, translate);
  eventProps(detailsGroup, element, bpmnFactory, elementRegistry, translate);

  return[
    generalGroup,
    detailsGroup
  ];
}

// Create the custom output tab
function createOutputTabGroups(element, translate) {

  // Create a group called outputGroup.
  var outputGroup = {
    id: 'Output',
    label: 'Output',
    entries: []
  };

  outputProps(outputGroup, element, translate, 'OutputParameter', outputJson);

  return [
    outputGroup
  ];
}

// Create the custom Input tab
function createInputTabGroups(element, translate) {

  // Create a group called "Connector".
  var connectorGroup = {
    id: 'Input',
    label: 'Input',
    entries: []
  };

  inputConnectorProps(connectorGroup, element, translate, dropdownJson, 'Connector Name', "Connector_Name");

  var SocketGroup = {
    id: 'Socket',
    label: 'Socket',
    entries: []
  };

  inputSocketProps(SocketGroup, element, translate, dropdownJson1, 'Socket Name', "socket");

  return [
    connectorGroup,
    SocketGroup
  ];
}

export default function CustomPropertiesProvider(
    eventBus, bpmnFactory, canvas,
    elementRegistry, translate) {

  PropertiesActivator.call(this, eventBus);

  this.getTabs = function(element) {

    var generalTab = {
      id: 'general',
      label: 'General',
      groups: createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate)
    };

    // The "input" tab
    var inputTab = {
      id: 'input',
      label: 'Input',
      groups: createInputTabGroups(element, translate)
    };

    // The "output" tab
    var outputTab = {
      id: 'Output',
      label: 'Output',
      groups: createOutputTabGroups(element, translate)
    };

    return [
      generalTab,
      inputTab,
      outputTab
      ];
  };

  eventBus.on('propertiesPanel.isPropertyEditable', 10000, function(context) {
        //var element = context.element;
        var entry = context.entry;
        // var group = context.group;
        // var propertyName = context.propertyName,
        // tab = context.tab;
        if(entry.id === 'id'){
            return false;
        }
      });
}

inherits(CustomPropertiesProvider, PropertiesActivator);
