package controllers

import play.api.libs.json.{Json, JsObject}
import play.api.mvc.{Action, Controller}

import play.api.libs.concurrent.Execution.Implicits.defaultContext

import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection


/**
 * Created by Jolin on 19/10/2014.
 */
object MarkerController extends Controller with MongoController {

  def collection: JSONCollection = db.collection[JSONCollection]("markers")


  def getMarkers() = Action.async {
    collection.find(Json.obj()).cursor[JsObject].collect[List]().map(markers => Json.toJson(markers)).map(markers => Ok(markers))
  }

  def putMarker() = Action.async(parse.json) { request =>
    collection.insert(request.body).map(lastError =>
      Ok("Mongo LastError: %s".format(lastError)))
  }
}
