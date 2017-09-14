# area3d_vis
3D Graph Visualization for Kibana 5 and 6.0.0-alpha1!

This is the first version of a 3D Graph Visualization plugin for Kibana 5.0 / 6.0.0-alpha1.

The idea behind this visualization is to add a new interesting Graph feature, to the current Kibana series of 
charts and metrics, to show 3D data.

If you really liked this and feel like making a donation : <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=juan.carniglia@gmail.com&lc=AR&item_name=JuanCarniglia&item_number=1010&currency_code=USD&bn=PP-DonationsBF:btn_donate_LG.gif:NonHosted">
<img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" alt="Contribute!" />
</a>

Charts are rendered using the awesome js component called Vis.js, developed by @almende (https://github.com/almende/vis).

Here are some screenshots of how it's coming out. I hope you like it!

![Surface Area](3d_charts_Screenshot1.PNG)
![Surface Area - Random Values](3d_charts_Screenshot2.PNG)
![Dashboard showing multiple charts](3d_charts_Screenshot3.PNG)

The visualization needs one Metric (Count, Avg, Sum, Max, Min) which will be the Z value, 
and two Aggregators (X, Y).

The X and Y Aggregations should be Terms aggregations (in the example, over the property xposition and yposition correspondingly).

In this example I'm plotting the performance indicators of an imaginary, solar panel array.

You need to install first Vis.js !

So the installation instructions should be:

While on the [kibana_home]/src/core_plugins ...
```
git clone https://github.com/JuanCarniglia/area3d_vis
cd area3d_vis
npm install
```

Actually all you need is Vis, so you can just:
```
npm install vis
```

On the test_data folder, there are scripts to create an Index, and to input some fake data into in, as in these examples.

- make.bat (Deletes and Creates an index called "solarpanels" with some mapping)
- solarpanels_data.bat (Adds some data)




