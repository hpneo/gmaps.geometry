'use strict';

var _forEach = require('lodash-compat/collection/forEach'),
    _map = require('lodash-compat/collection/map'),
    _flatten = require('lodash-compat/array/flatten'),
    _extend = require('lodash-compat/object/extend'),
    geometryModule = {};

geometryModule.drawPolyline = function(options) {
  var path = [],
      latLngs = options.path,
      polylineOptions = {
        map: this.map,
        path: path,
        strokeColor: options.strokeColor,
        strokeOpacity: options.strokeOpacity,
        strokeWeight: options.strokeWeight,
        geodesic: options.geodesic,
        clickable: true,
        editable: false,
        visible: true
      },
      polylineEventNames = [
        'click', 'dblclick', 'mousedown', 'mousemove',
        'mouseout', 'mouseover', 'mouseup', 'rightclick'
      ];

  if (latLngs.length > 0) {
    if (latLngs[0][0] === undefined) {
      path = latLngs;
    }
    else {
      _forEach(latLngs, function(latLng) {
        path.push(new google.maps.LatLng(latLng[0], latLng[1]));
      });
    }
  }

  if (options.hasOwnProperty('clickable')) {
    polylineOptions.clickable = options.clickable;
  }

  if (options.hasOwnProperty('editable')) {
    polylineOptions.editable = options.editable;
  }

  if (options.hasOwnProperty('icons')) {
    polylineOptions.icons = options.icons;
  }

  if (options.hasOwnProperty('zIndex')) {
    polylineOptions.zIndex = options.zIndex;
  }

  var polyline = new google.maps.Polyline(polylineOptions);

  _forEach(polylineEventNames, function(polylineEventName) {
    var polylineEventListener = options[polylineEventName];

    if (polylineEventListener) {
      google.maps.event.addListener(polyline, polylineEventName, function(eventObject) {
        polylineEventListener.call(this, eventObject);
      });
    }
  });

  this.polylines.push(polyline);

  if (GMaps.trigger) {
    GMaps.trigger('polyline_added', this, polyline);
  }

  return polyline;
};

geometryModule.removePolyline = function(polyline) {
  for (var i = 0; i < this.polylines.length; i++) {
    if (this.polylines[i] === polyline) {
      this.polylines[i].setMap(null);
      this.polylines.splice(i, 1);

      if (GMaps.trigger) {
        GMaps.trigger('polyline_removed', this, polyline);
      }

      break;
    }
  }
};

geometryModule.removePolylines = function() {
  _forEach(this.polylines, function(polyline) {
    polyline.setMap(null);
  });

  this.polylines.length = 0;
};

geometryModule.drawCircle = function(options) {
  options =  _extend({
    map: this.map,
    center: new google.maps.LatLng(options.lat, options.lng)
  }, options);

  delete options.lat;
  delete options.lng;

  var polygon = new google.maps.Circle(options),
      polygonEventNames = [
        'click', 'dblclick', 'mousedown', 'mousemove',
        'mouseout', 'mouseover', 'mouseup', 'rightclick'
      ];

  _forEach(polygonEventNames, function(polygonEventName) {
    var polygonEventListener = options[polygonEventName];

    if (polygonEventListener) {
      google.maps.event.addListener(polygon, name, function(eventObject) {
        polygonEventListener.call(this, eventObject);
      });
    }
  });

  this.polygons.push(polygon);

  if (GMaps.trigger) {
    GMaps.trigger('circle_added', this, polygon);
  }

  return polygon;
};

geometryModule.drawRectangle = function(options) {
  options = _extend({
    map: this.map
  }, options);

  var latLngBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(options.bounds[0][0], options.bounds[0][1]),
    new google.maps.LatLng(options.bounds[1][0], options.bounds[1][1])
  );

  options.bounds = latLngBounds;

  var polygon = new google.maps.Rectangle(options),
      polygonEventNames = [
        'click', 'dblclick', 'mousedown', 'mousemove',
        'mouseout', 'mouseover', 'mouseup', 'rightclick'
      ];

  _forEach(polygonEventNames, function(polygonEventName) {
    var polygonEventListener = options[polygonEventName];

    if (polygonEventListener) {
      google.maps.event.addListener(polygon, name, function(eventObject) {
        polygonEventListener.call(this, eventObject);
      });
    }
  });

  this.polygons.push(polygon);

  if (GMaps.trigger) {
    GMaps.trigger('rectangle_added', this, polygon);
  }

  return polygon;
};

geometryModule.drawPolygon = function(options) {
  var useGeoJSON = false;

  if (options.hasOwnProperty('useGeoJSON')) {
    useGeoJSON = options.useGeoJSON;
  }

  delete options.useGeoJSON;

  options = _extend({
    map: this.map
  }, options);

  if (useGeoJSON === false) {
    options.paths = [options.paths.slice(0)];
  }

  if (options.paths.length > 0) {
    if (options.paths[0].length > 0) {
      options.paths = _flatten(_map(options.paths, function(path) {
        return GMaps.arrayToLatLng(path, useGeoJSON);
      }));
    }
  }

  var polygon = new google.maps.Polygon(options),
      polygonEventNames = [
        'click', 'dblclick', 'mousedown', 'mousemove',
        'mouseout', 'mouseover', 'mouseup', 'rightclick'
      ];

  _forEach(polygonEventNames, function(polygonEventName) {
    var polygonEventListener = options[polygonEventName];

    if (polygonEventListener) {
      google.maps.event.addListener(polygon, name, function(eventObject) {
        polygonEventListener.call(this, eventObject);
      });
    }
  });

  this.polygons.push(polygon);

  if (GMaps.trigger) {
    GMaps.trigger('polygon_added', this, polygon);
  }

  return polygon;
};

geometryModule.removePolygon = function(polygon) {
  for (var i = 0; i < this.polygons.length; i++) {
    if (this.polygons[i] === polygon) {
      this.polygons[i].setMap(null);
      this.polygons.splice(i, 1);

      if (GMaps.trigger) {
        GMaps.trigger('polygon_removed', this, polygon);
      }

      break;
    }
  }
};

geometryModule.removePolygons = function() {
  _forEach(this.polygons, function(polygon) {
    polygon.setMap(null);
  });

  this.polygons.length = 0;
};

if (window.GMaps) {
  GMaps.customEvents = GMaps.customEvents || [];
  GMaps.customEvents = GMaps.customEvents.concat([
    'polyline_added', 'polyline_removed', 'circle_added',
    'rectangle_added', 'polygon_added', 'polygon_removed'
  ]);

  _extend(GMaps.prototype, geometryModule);
}

module.exports = geometryModule;