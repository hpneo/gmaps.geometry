# gmaps.geometry

gmaps.js module to draw lines and polygons.

## Install

For using with bundlers (as Browserify or Webpack):

`npm install gmaps.geometry --save`

Before `require()` this module you need to `require('gmaps.core')`.

For using directly in the browser, download the `gmaps.geometry.js` (or `gmaps.geometry.min.js`) in `dist`.

## Usage

You need to register a `<script>` tag with the Google Maps JavaScript API, then import gmaps.core.

Every Google Maps map needs a container (`<div id="map"></div>` in this demo), which needs to have width and height, and be visible (without `display: none`, for example):

```
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
  <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
  <script src="gmaps.core.js"></script>
  <script src="gmaps.geometry.js"></script>
  <style type="text/css">
    #map {
      width: 400px;
      height: 400px;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = new GMaps({
      el : '#map',
      lat: -12.0433,
      lng: -77.0283,
      zoom: 12
    });
  </script>
</body>
</html>
```

For more examples you can check the tests in this repo.

## Documentation

### `drawPolyline(options)`

Add a polyline to the map and returns it. A polyline is an instance of `google.maps.Polyline`. The new polyline will be added to the property `polylines` from the `GMaps` instance.

The `options` object should contain:

* `path` (array): The path of the polyline. Can be an array of coordinates (a coordinate is an array with two numbers, for latitude and longitude), or an array of `google.maps.LatLng` objects.
* `strokeColor` (string): A color for the polyline stroke. All CSS3 colors are supported except for extended named colors.
* `strokeOpacity` (number): A float value (from 0.0 to 1.0) that indicates the stroke opacity.
* `strokeWeight` (number): The stroke width in pixels.
* `geodesic` (boolean): When true, edges of the polygon are interpreted as geodesic and will follow the curvature of the Earth. When false, edges of the polygon are rendered as straight lines in screen space. Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions are maintained relative to the surface of the earth. Defaults to false. _(from Google Maps JavaScript API Reference)_
* `clickable` (boolean): Indicates if the polyline can receive mouse events.
* `editable` (boolean): Indicates if the polyline can be edited by the user.
* `icons` (array): An array of [icons](https://developers.google.com/maps/documentation/javascript/reference#IconSequence), which will be rendered along the polyline.
* `zIndex` (number): The zIndex compared to other polylines or polygons.

Additionally, `options` can accept all the options from the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/reference#PolylineOptions).

Also, `options` can contain callbacks for the following events:

* `click`
* `dblclick`
* `mousedown`
* `mousemove`
* `mouseout`
* `mouseover`
* `mouseup`
* `rightclick`

### `removePolyline(polyline)`

Remove a polyline from the map and the `polylines` property. The `polyline` parameter must be a polyline created with `drawPolyline()`, or one of the elements inside the `polylines` property.

### `removePolylines()`

Remove all the polylines from the map and clear the `polylines` property.

### `drawCircle(options)`

Add a circle to the map and returns it. A circle is an instance of `google.maps.Circle`. The new circle will be added to the property `polygons` from the `GMaps` instance.

The `options` object should contain:

* `lat` (number): The latitude of the circle's center.
* `lng` (number): The longitude of the circle's center.
* `radius` (number): The radius of the circle in meters.
* `strokeColor` (string): A color for the circle stroke. All CSS3 colors are supported except for extended named colors.
* `strokeOpacity` (number): A float value (from 0.0 to 1.0) that indicates the stroke opacity.
* `strokeWeight` (number): The stroke width in pixels.
* `fillColor` (string): A background color for the circle. All CSS3 colors are supported except for extended named colors.
* `fillOpacity` (number): A float value (from 0.0 to 1.0) that indicates the fill opacity.
* `clickable` (boolean): Indicates if the circle can receive mouse events.
* `editable` (boolean): Indicates if the circle can be edited by the user.
* `zIndex` (number): The zIndex compared to other polylines or polygons.

Also, can accept all the options from the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/reference#CircleOptions).

Also, `options` can contain callbacks for the following events:

* `click`
* `dblclick`
* `mousedown`
* `mousemove`
* `mouseout`
* `mouseover`
* `mouseup`
* `rightclick`

### `drawRectangle(options)`

Add a rectangle to the map and returns it. A rectangle is an instance of `google.maps.Rectangle`. The new rectangle will be added to the property `polygons` from the `GMaps` instance.

The `options` object should contain:

* `bounds` (array): An array of two coordinates (a coordinate is an array with two numbers, for latitude and longitude), the first one indicates the south-west corner and the second one the nort-east corner of the rectangle.
* `strokeColor` (string): A color for the rectangle stroke. All CSS3 colors are supported except for extended named colors.
* `strokeOpacity` (number): A float value (from 0.0 to 1.0) that indicates the stroke opacity.
* `strokeWeight` (number): The stroke width in pixels.
* `fillColor` (string): A background color for the rectangle. All CSS3 colors are supported except for extended named colors.
* `fillOpacity` (number): A float value (from 0.0 to 1.0) that indicates the fill opacity.
* `clickable` (boolean): Indicates if the rectangle can receive mouse events.
* `editable` (boolean): Indicates if the rectangle can be edited by the user.
* `zIndex` (number): The zIndex compared to other polylines or polygons.

Also, can accept all the options from the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/reference#RectangleOptions).

Also, `options` can contain callbacks for the following events:

* `click`
* `dblclick`
* `mousedown`
* `mousemove`
* `mouseout`
* `mouseover`
* `mouseup`
* `rightclick`

### `drawPolygon(options)`

Add a polygon to the map and returns it. A polygon is an instance of `google.maps.Polygon`. The new polygon will be added to the property `polygons` from the `GMaps` instance.

The `options` object should contain:

* `paths` (array): The paths of the polygon, where each path is an array of coordinates (a coordinate is an array with two numbers, for latitude and longitude), or an array of `google.maps.LatLng` objects. A polygon can contain one or more paths. Paths are closed automatically; do not repeat the first vertex of the path as the last vertex. Simple polygons may be defined using a single array of LatLngs. More complex polygons may specify an array of arrays. _(from Google Maps JavaScript API Reference)_
* `useGeoJSON` (boolean): If true, the `path` option will be treated using with the GeoJSON specification.
* `strokeColor` (string): A color for the polygon stroke. All CSS3 colors are supported except for extended named colors.
* `strokeOpacity` (number): A float value (from 0.0 to 1.0) that indicates the stroke opacity.
* `strokeWeight` (number): The stroke width in pixels.
* `fillColor` (string): A background color for the polygon. All CSS3 colors are supported except for extended named colors.
* `fillOpacity` (number): A float value (from 0.0 to 1.0) that indicates the fill opacity.
* `geodesic` (boolean): When true, edges of the polygon are interpreted as geodesic and will follow the curvature of the Earth. When false, edges of the polygon are rendered as straight lines in screen space. Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions are maintained relative to the surface of the earth. Defaults to false. _(from Google Maps JavaScript API Reference)_
* `clickable` (boolean): Indicates if the polygon can receive mouse events.
* `editable` (boolean): Indicates if the polygon can be edited by the user.
* `zIndex` (number): The zIndex compared to other polylines or polygons.

Also, can accept all the options from the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/reference#PolygonOptions).

Also, `options` can contain callbacks for the following events:

* `click`
* `dblclick`
* `mousedown`
* `mousemove`
* `mouseout`
* `mouseover`
* `mouseup`
* `rightclick`

### `removePolygon(polygon)`

Remove a polygon from the map and the `polygons` property. The `polygon` parameter must be a polygon created with `drawCircle()`, `drawRectangle()`, `drawPolygon()`, or one of the elements inside the `polygons` property.

### `removePolygons()`

Remove all the polygons from the map and clear the `polygons` property.

---

### Events

The following methods triggers custom events. You need to add the `gmaps.events` module before using this module to work with those events:

| Method | Event |
| ------ | ----- |
| `drawPolyline` | `polyline_added` |
| `removePolyline` | `polyline_removed` |
| `drawRectangle` | `rectangle_added` |
| `drawCircle` | `circle_added` |
| `drawPolygon` | `polygon_added` |
| `removePolygon` | `polygon_removed` |

## Changelog

For pre 0.5.0 versions, check [gmaps.js changelog](https://github.com/hpneo/gmaps#changelog)

### 0.5.0

* Node module format (CommonJS)

## License

MIT License. Copyright 2015 Gustavo Leon. http://github.com/hpneo

Permission is hereby granted, free of charge, to any
person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the
Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice
shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.