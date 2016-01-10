/**
 * Copyright Notice 
 * 
 * All trademarks mentioned herein belong to their respective 
 * owners. Unless identified with the designation "COPY FREE", the 
 * contents of this document is copyrighted by Charles F. Day & 
 * Associates, LLC.. Charles F. Day & Associates, LLC. hereby authorizes 
 * you to copy this document for non-commercial use within your 
 * organization only. In consideration of this authorization, you agree 
 * that any copy of these documents you make shall retain all copyright 
 * and other proprietary notices contained herein. You may not otherwise 
 * copy or transmit the contents of this code either electronically or in 
 * hard copies. You may not alter the content of this document in any 
 * manner. If you are interested in using the contents of this document 
 * in any manner except as described above, please contact Charles F. Day 
 * & Associates, LLC. at for information on licensing. 
 * 
 * Individual documents published by Charles F. Day & Associates, LLC. 
 * may contain other proprietary notices and copyright information 
 * specific to that individual document. Nothing contained herein shall 
 * be construed as conferring by implication, estoppel or otherwise any 
 * license or right under any patent, trademark or other property right 
 * of Charles F. Day & Associates, LLC. or any third party. Except as 
 * expressly provided above nothing contained herein shall be construed 
 * as conferring any license or right under any copyright or other 
 * property right of Charles F. Day & Associates, LLC. or any third 
 * party. Note that any product, process, or technology in this document 
 * may be the subject of other intellectual property rights reserved by 
 * Charles F. Day & Associates, LLC. and may not be licensed here under. 
 * 
 * Copyright Charles F. Day & Associates, LLC. (2015) All rights reserved.
 * 
 * @author James J Jones
 */

var angular = require('angular');

d3 = require("d3");
nv = require("nvd3");

topojson = require("topojson");

require('angular-storage');
require('angular-jwt');
//require('angular-route');
require('angular-ui-router');
require('./D3Map.Constants');
require('./D3Map.Services');
require('./D3Map.States');
require('./D3BasicMap.Directives')
require('./D3Basics.Directives');
require('./InteractiveMap.Directives');

var HomeCtrl = require('./controllers/home/HomeCtrl');

var D3BasicsCtrl = require('./controllers/D3BasicsCtrl');
var BasicMapCtrl = require('./controllers/BasicMapCtrl');
var InteractiveMapCtrl = require('./controllers/InteractiveMapCtrl');

var app = angular.module('D3Map', ['angular-storage', 'angular-jwt', 'ui.router', 'D3BasicMap.Directives', 'D3Basics.Directives', 'D3Map.Services', 'D3Map.States', 'InteractiveMap.Services']);

app.controller('HomeCtrl', ['$http', '$scope', '$state', 'store', HomeCtrl]);

app.controller('D3BasicsCtrl', ['$rootScope', '$scope', D3BasicsCtrl]);
app.controller('BasicMapCtrl', ['$rootScope', '$scope', BasicMapCtrl]);
app.controller('InteractiveMapCtrl', ['$rootScope', '$scope', InteractiveMapCtrl]);