//import { Template } from 'meteor/blaze-html-templates' <- DOESN'T WORK...
import { FlowRouter } from 'meteor/kadira:flow-router'

Template.registerHelper('routePath', name => name ? FlowRouter._routesMap[name] ? FlowRouter._routesMap[name].path : undefined : undefined)

Template.registerHelper('equals', (x, y) => x===y)