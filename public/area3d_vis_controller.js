import _ from 'lodash';
import uiModules from 'ui/modules';
import $ from 'jquery';
const module = uiModules.get('kibana/area3d_vis', ['kibana']);

import vis3D from 'vis'; //Load vis.js from node_modules

module.controller('KbnArea3DVisController', function ($scope, $element, Private) {

  let rootElement = $element;

  let data = null;
  let graph = null;

  $scope.$watchMulti(['esResponse', 'vis.params'], function ([resp]) {

    if (resp) {
      const vis = $scope.vis;

      data = new vis3D.DataSet();
      var counter = 0;
      let height = 600;
      let width = 600;
      let x = 0;
      let y = 0;
      let z = 0;
      let cols = 0;
      let rows = 0;

      // Go from Elasticsearch resp object to vis.js Dataset
      _.map(resp.aggregations, function (xElementRoot) {
        if (xElementRoot !== null) {
          _.map(xElementRoot.buckets, function (xElement) {
            if (xElement !== null) {
              x = parseInt(xElement.key);
              cols++;
              _.map(xElement[3].buckets, function (yElementBucket) {

                y = parseInt(yElementBucket.key);
                rows++;

                if (yElementBucket.hasOwnProperty('1')) {
                  z = parseInt(yElementBucket[1].value);
                } else {
                  z = yElementBucket.doc_count;
                }

                data.add({
                  id: counter++,
                  x: x,
                  y: parseInt(yElementBucket.key),
                  z: z,
                  style: z
                });
              });
            }
          });
        }
      });

      // Set Graphics Type
      let graphType = vis.params.graphSelect !== null ? vis.params.graphSelect.id : 'surface';

      // specify options
      var options = {
        width: width + 'px',
        height: height + 'px',
        style: graphType,
        xBarWidth: 5,
        yBarWidth: 5,
        showPerspective: vis.params.showPerspective,
        showGrid: vis.params.showGrid,
        showShadow: vis.params.showShadow,
        keepAspectRatio: vis.params.keepAspectRatio,
        verticalRatio: 0.5,
        xLabel: vis.params.xLabel !== null ? vis.params.xLabel : 'X',
        yLabel: vis.params.yLabel !== null ? vis.params.yLabel : 'Y',
        zLabel: vis.params.zLabel !== null ? vis.params.zLabel : 'Z',
        legendLabel: 'This is a legend'
      };

      // Instantiate our graph object.
      graph = new vis3D.Graph3d(rootElement[0], data, options);

    }
  });
});
