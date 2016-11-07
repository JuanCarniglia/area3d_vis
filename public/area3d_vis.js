import 'ui/agg_table';
import 'ui/agg_table/agg_table_group';

import 'plugins/area3d_vis/area3d_vis.less';
import 'plugins/area3d_vis/area3d_vis_controller';
import 'plugins/area3d_vis/area3d_vis_params';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import area3dVisTemplate from 'plugins/area3d_vis/area3d_vis.html';

require('ui/registry/vis_types').register(Area3DVisProvider);

function Area3DVisProvider(Private) {
  const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
  const Schemas = Private(VisSchemasProvider);

  return new TemplateVisType({
    name: 'area3d',
    title: 'Area3D',
    description: 'First 3D Chart on Kibana.',
    icon: 'fa-cube',
    template: area3dVisTemplate,
    params: {
      defaults: {
        graphSelect: 'surface',
        showPerspective: true,
        showGrid: false,
        showShadow: false,
        keepAspectRatio: true
      },
      editor: require('plugins/area3d_vis/area3d_vis_params.html')
    },
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: 'Metric',
        min: 1,
        max: 2,
        defaults: [
          { type: 'count', schema: 'metric' }
        ]
      },
      {
        group: 'buckets',
        name: 'bucket',
        title: 'X-Dimension'
      },
      {
        group: 'buckets',
        name: 'split',
        title: 'Y-Dimension'
      }
    ])
  });
}

// export the provider so that the visType can be required with Private()
export default Area3DVisProvider;
