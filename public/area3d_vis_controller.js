import _ from 'lodash';
import uiModules from 'ui/modules';
import $ from 'jquery';
const module = uiModules.get('kibana/area3d_vis', ['kibana']);

import vis3D from 'plugins/area3d_vis/vendor/vis';

module.controller('KbnArea3DVisController', function ($scope, $element, Private) {
  //const tabifyAggResponse = Private(AggResponseTabifyTabifyProvider);

  let rootElement = $element;

  let data = null;
  let graph = null;

  $scope.$watchMulti(['esResponse', 'vis.params'], function ([resp]) {

    if (resp) {
      const vis = $scope.vis;

      // Create and populate a data table.
      data = new vis3D.DataSet();
      // create some nice look ing data with sin/cos
      var counter = 0;
      let x = 0;
      let y = 0;
      let z = 0;

      _.map(resp.aggregations, function (xElementRoot) {
        if (xElementRoot !== null) {
          _.map(xElementRoot.buckets, function (xElement) {
            if (xElement !== null) {
              x = parseInt(xElement.key);
              _.map(xElement[3].buckets, function (yElementBucket) {

                y = parseInt(yElementBucket.key);

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


      let graphType = vis.params.graphSelect !== null ? vis.params.graphSelect.id : 'surface';

      // specify options
      var options = {
        width: '600px',
        height: '600px',
        style: graphType,
        showPerspective: vis.params.showPerspective,
        showGrid: vis.params.showGrid,
        showShadow: vis.params.showShadow,
        keepAspectRatio: vis.params.keepAspectRatio,
        verticalRatio: 0.5
      };

      // Instantiate our graph object.
      graph = new vis3D.Graph3d(rootElement[0], data, options);

    }
  });
});
