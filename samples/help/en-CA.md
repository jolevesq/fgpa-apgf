# General Information

The Federal Geospatial Platform (FGPA) Author tool is use to create, update, validate and preview configuration files
used by the Federal Geospatial Platform Viewer (FGPV).

FGPA is based on [Angular Schema Form](https://github.com/json-schema-form/angular-schema-form) library. This library
generate forms from JSON schemas using AngularJS. FGPA use the same schema as FGPV and let user modify values to easily
create new configuration file. The schema is composed of 5 sections:
+ **Map**
    + Map is divided in 5 sections (Extents and Levels of Details, Basemaps, Layers, Legend and Components)
+ **UI**
    + UI is divided in 4 sections (General, Application Bar, Navigation and Side Menu)
+ **Services**
    + Services is divided in 3 sections (Export Map, Geo Search and Service End Points)
+ **Version**
+ **Language**

To find more information about schema structure, go to [FGPV schema](https://github.com/fgpv-vpgf/fgpa-apgf/wiki/FGPV_schema_doc)
section in our wiki. This section will also give you information on schema values and effect in the viewer.

##### Useful information

To switch the interface language, use the language dropdown menu located in the upper right corner ![](languagebutton.png "Language dropdown menu").

At any time, when available, you can use the expand or collapse buttons ![](expandcollapse.png "Expand and collapse buttons")
to expand or collapse all the items inside a section.

Some configuration items are for more advance user. You can always show/hide them with the _Show advanced configuration
options_ checkbox under each section name.

Some items are like basemaps, layers and layer fields and reorderable. You can easily identify reorderable items with the
drag handle ![](draghandle.png "Drag handle icon"). To reorder an item, click the handle then drag the item to the desired
position. A yellow box will appear under the item where it will be place when you release the handle.
_Note_ it is easier to drag items when all items inside a section are collapsed.

> Unanticipated behavior may occur if any interactions occur before data is fully loaded. Please allow the webpage to
> load completely before triggering any functions. If you still encounter bugs, please [submit an issue](https://github.com/fgpv-vpgf/fgpa-apgf/issues)
> in our GitHub repository. Someone from our development team will take care of it as soon as possible.


# Header

![](header.png "Header overview")

The header toolbar let you do the following actions:
+ Open the FGPA help window from the question mark button.
+ Create a new configuration file from scratch ![](plussign.png "Plus sign") _- only available when no templates are provided -_.
+ Create a new configuration file from templates ![](templates.png "Templates dropdown menu") _- only available when templates are provided -_.
    + Templates are manage by the organization in charge of this FGPA instance. Contact them if you need more information
    or update to the list of templates.
+ Upload an existing configuration file ![](uparrow.png "Arrow sign").
+ Save the configuration file once finished ![](diskette.png "Diskette sign").
    + All files are saved to your download folder.

File name you are working on is shown at the left of the save icon. however, if you save a file with an existing name, it
will be changed by your operating system and may no longer match the actual file name (e.g. test is shown but real file
name is test(1)).

> When you create or upload a configuration file, loading time may vary based on number of layers and basemaps being loaded.


# Map - Extents and Levels of Detail

This section is use to define the tile schemas your viewer application will use. For each tile schema, a spatial reference
systems must be define in the _Spatial Extents Sets_ section. Again, for each tile schema, levels of detail (LODs) must
be define in the _Levels of Detail Sets_ section. For this, an ESRI tile cache layer must be use to get list of LODs from.
Each LOD corresponds to a map at a given scale or resolution. So each basemap linked to a tile schema must share the same
spatial extent and LODs.

>To find more information about how to setup _Extents and Levels of Detail_ section, see the dropdown help below the section header.


# Map - Basemaps

This section is use to add basemaps to your viewer application. To add a basemap, a tile schema appropriate for this basemap
must already have been created previously. Once a basemap is added, the following information must be provided:
+ Name _- it will be use to generate the basemap id -_
+ Description
+ Alternate Text
+ Tile Schema ID (selected from existing tile schema)
+ At least one layer with ID, Layer Type and URL.

You need to set the initial basemap to appear when the viewer launch. To do so, select the basemap id (name-_unique key_
from _Initial Basemap ID_) dropdown menu.

>To find more information about how to setup _Basemaps_ section, see the dropdown help below the section header.


# Map - Layers

This section is use to add layers to your viewer application. Once a layer is added, the following information must be provided:
+ Layer Type
    + esriDynamic
    + esriFeature
    + esriImage
    + esriTile (an appropriate tile schema must exist)
    + ogcWms
+ Name _- it will be use to generate the layer id -_
+ URL

If the selected layer type is esriDynamic or ocgWms, at least one layer entry must be added. Those properties must be set:
+ Index for esriDynamic
+ ID for ogcWMS

You can make esriDynamic layer looks like a esriFeature layer inside the legend with this option _Single entry collapse_.
It will indicates that the dynamic layer with a single layer entry should be rendered without the root group.

Optionally you can set Metadata URL and Catalog URL to show this information inside the metadata panel available from the
_Layer Controls_ section.

For each layer and layer entries _Layer Controls_ options can be selected:
+ opacity
+ visibility
+ boundingBox
+ query
+ snapshot
+ metadata
+ boundaryZoom
+ refresh
+ reload
+ remove
+ settings
+ data
+ styles

For each layer and layer entries _State_ options can be selected:
+ Opacity - Initial opacity value.
+ Visibility - Initial visibility setting.
+ Bounding box - Initial display of the layer bounding box.
+ Query - Allow querying so information will appear inside the details panel when item on map is clicked.
+ Snapshot - Retrieve all feature data immediately on load. Will only work with esriFeature layer type.
+ Hovertips - Enable hover tips. Will only work with esriFeature layer type.

For every esriFeature layer and every esriDynamic layer entries a table is created automatically when URL or entry Index
is set. The table section is optional and will be filled from service information by default. You can customize the following properties:
+ Title - Specifies the title to apply. Default title is the layer name.
+ Description - Specifies additional information to be displayed in the table settings panel.
+ Maximize - Specifies if table is maximized on open. Default size is split view.
+ Apply map - Specifies if filters (from columns filter) are applied to the map (definition query).
+ Fields Customization - Specifies the array of columns for the table. At any time, columns can be reinitialize with _Set Fields_
button
    + Title - Specifies the title to apply. Default title is the columns alias name from the service.
    + Description - Specifies additional information to be displayed in the table settings panel.
    + Visible - Specifies if field is visible by default.
    + Width - Columns width. If no width is supplied, best width will be calculated.
    + Sort - Sort ascendant (asc) or descendant (dsc).
    + Searchable - Specifies if column can be filter or not.
    + Filters - Each column have the following filter properties that can be customize:
        + Type - Specifies the filter type to use. If type is not specified, data field type will be use. String filter
        can be string or selector. Other filter must be the same type.
        + Value - Specifies the filter value.
        + Static - Specifies if filter value can be modified or not.

**Important** - Modifying the layer type of an existing layer is not a good thing to do. It is better to create a new layer
and then delete the old one.

>To find more information about how to setup _Layers_ section, see the dropdown help below the section header.


# Map - Legend

This section is use to define the viewer legend. There is 2 types of legend: Autopopulate and Structured. The autopopulate
legend will take the layers as they appear in the Layers section and create a default legend.

The structured legend let you customize the legend to change the order, the grouping, add description and many other settings.

>To find more information about how legend customization, see the dropdown help below the section header.


# Map - Components

This section is use to define map component:
+ Mouse Coordinates
    + WKID must be set to see mouse coordinates on the map
    + Coordinates can be in degrees minutes seconds (DMS) and decimal degrees or meters depending on the projection (WKID)
+ North Arrow
+ Scale Bar
+ Overview Map
    + To change the overview map basemap, use _Static Overview Map_ in the appropriate tile schema of _Extents and Levels of Detail_ section


# User Interface

##### General

General section can be use to customize the following informations:
+ Full screen - Selected if viewer takes up the entire viewport when launch.
+ On Viewer Failure
    + Failure Message -  Message to be used in place of the default failure message.
    + Failure Image Url - Image to be used in place of the default failure Image.
+ Legend
    + _Is Reorderable_ set layers inside the legend reorderable. Structured legend ignores this option.
    + _Allow Layers Import_ let user import additional layers at runtime besides those in the configuration file.
+ Legend Opening Options set if legend will be open by default in small, medium and/or large display.
+ Table Opening Options set if table will be open by default in small, medium and/or large display.
    + For table to open by default, a layer id must be selected.

##### Application Bar

![](applicationbar.png "Application bar")

The Application Bar section let you add or remove the following tools:
+ Side Menu
+ Geosearch
+ Basemap Selector
+ Layers Selector (legend)

##### Navigation Bar

The Navigation Bar let you add or remove the following navigation components:
+ geolocator - show user position on the map
+ home - zoom to initial extent
+ basemap - open Basemap Selector _- also available in the Application Bar -_
+ help - open help window _- also available in the Side Menu -_
+ fullscreen - open viewer in fullscreen _- also available in the Side Menu -_
+ geoSearch - open Geosearch tool _- also available in the Application Bar -_
+ sidemenu - open the Side Menu _- also available in the Application Bar -_
+ layers - open the Layers Selector (legend) _- also available in the Application Bar -_

You can restrict navigation within the maximum extent by checking the _Restrict Navigation_ checkbox.

##### Side Menu

The Side Menu let you configure how the side menu will look like. First you can set a title and a logo. If no title and
logo are provided, default title (FGP R2 Viewer) and logo will be use. Then you can add as many group of tool as you want
from the following:
+ layers - Layers Selector (legend) _- also available in the Application Bar -_
+ basemap - Basemap Selector _- also available in the Application Bar -_
+ geosearch - Geosearch tool _- also available in the Application Bar -_
+ about - show additional information about the map
    + About can be of type string or file. for file content, provide a folder name where your custom about markdown file
    will be inside the FGPV instance.
    + **Important** about from a folder content will not show up inside preview mode.
+ fullscreen - open viewer in fullscreen _- also available in the Navigation Bar -_
+ export - export the map as png image
+ share - create a URL link to share
+ touch - enable touch mode for touch screen
+ help - open help window _- also available in the Navigation Bar -_
    + If you do not want to use the default help, provide a folder name where your custom help markdown file will be inside
    the FGPV instance.
    + **Important** help will not show up inside preview mode.
+ language - set interface language
+ plugins - container to receive custom plugins
    + **Important** plugins section will not show up inside preview mode. Piece of code need to be added to html page to
    make it work.

_Note_ tools inside group are not order as they appear inside the group list. They are order by selection order e.g. if
you click basemap then layers, inside the side menu basemap will appear first because it was the first item selected inside
the group.


# Services

##### Export Map

Export Map let you configure what components will be shown by default and/or be customizable on the map when it will be
exported as a png image. The _Is present_ checkbox under each component let you add it by default to the export map. The
_User can remove it_ checkbox let you choose if you want the user to be able to remove it from the export.

The following components can be shown or customized:
+ Title _- a default value can be set -_
+ Map
+ Legend
+ Map Elements (north arrow and scalebar)
+ Footnote _- a default value can be set -_.
+ Timestamp

##### Geosearch

Geosearch section is use to configure the geosearch viewer capabilities. Geosearch let you find locations like city, province,
ake, mountains and so on from the geoname database. In addition of this, geosearch let you find location by National Topographic
System (NTS) name, forward sortation area (FSA) code and Latitude/Longitude. Those last 3 search types can be disable by
checking the corresponding checkbox.

All URLs use by geosearch are readonly values. If you encounter a problem, contact the person in charge of this FGPA instance
and/or [submit an issue](https://github.com/fgpv-vpgf/fgpa-apgf/issues) to our developers team.

##### Service endpoints

This section contains all services urls use by the viewer. They are read only values so it is not possible to modify them
directly. If you have problems with those services, please contact contact the person in charge of your FGPV.


# Version

The version section lets you select the version of the FGPV schema to use. There is always only one value available, the
latest FGPV schema version.


#  Language

The language section let you select the appropriate language for the configuration file.


#  Summary Panel

![](summarypanel.png "Summary panel")

The Summary Panel is mainly use to to know if your configuration file respect the schema. You can validate your configuration
file by clicking the validate button ![](validate.png "Validate button").

Once the first validation is done, green check ![](greencheckbox.png "Green check symbol") will appear beside the fields that are valid and red
exclamation mark ![](redcircle.png "Red exclamation symbol") beside fields that are not valid. To go directly to an item, click on it
on the summary tree and you will be automatically redirected to the appropriate tab or item.
+ In blue, it is items inside a group like Tile Schema, Spatial Extents Sets, Level of Detail sets, Basemaps and Layers.
+ In _italic_, it is _advance configuration_ items. Those items will be hidden from the summary tree if _Show advanced configuration
options_ is not checked.

When configuration file is valid, the preview button ![](preview.png "Preview button") will become enable. Click this button to preview an
instance of FGPV with your current configuration file inside. This preview displays all the layers, basemaps, menu and so on
as it will be displayed in a fully functional FGPV instance. Only help and about folder content will not show up inside
preview mode. The preview may require a few seconds to display depending on:
+ Network location
+ Bandwidth availability
+ Number of layers being loaded
+ Layer types and their sizes

![](previewsample.png "Viewer preview")

Inside the summary panel you may have other buttons after the preview button. Those functions are extensions and may be
available for certain users only.

At the bottom of the summary panel you will find FGPA version information:
+ Version and build number
+ Date for this version/build
+ Link of our GitHub repository to report issues

![](summaryinfo.png "FGPA version information")
