package controllers

import play.api.Logger
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json.{JsValue, JsObject, Json}
import play.api.mvc.Action
import play.modules.reactivemongo.json.collection.JSONCollection

object MarkerController extends JsonController {


  def collection: JSONCollection = db.collection[JSONCollection]("markers")

  // /markers
  def getMarkers() = Action.async(parse.empty) { request =>
    val dateOption = request.getQueryString("d")
    val queryCreated = dateOption.map( date =>
      Json.obj( "$and" -> Json.arr(
        buildGreaterThanExistsQuery("creationDate", date.toLong),
        Json.obj("removeDate" -> Json.obj("$exists" -> false) )))
    ).getOrElse(Json.obj("removeDate" -> Json.obj("$exists" -> false) ))
    val queryRemoved = dateOption.map( date => buildGreaterThanExistsQuery("removeDate", date.toLong)).getOrElse(Json.obj("_id" -> -1))

    Logger.debug(queryCreated.toString())


    for(
      created <- collection.find(queryCreated).cursor[JsObject].collect[List]().map(markers => Json.toJson(markers));
      removed <- collection.find(queryRemoved).cursor[JsObject].collect[List]().map(markers => Json.toJson(markers))
    ) yield Ok(Json.obj("created" -> created, "removed" -> removed))
  }

  def deleteMarkers() = Action.async {
    collection.remove(Json.obj()).map(lastError => Ok("Mongo LastError: %s".format(lastError)))
  }


  // /marker
  def putMarker() = Action.async(parse.json) { request =>
    collection.insert(request.body).map(lastError =>
      Ok("Mongo LastError: %s".format(lastError)))
  }

  def removeMarker() = Action.async(parse.json) { request =>
    val selector = request.body \ "pos"
    val update = Json.obj("$set" -> Json.obj("removeDate" -> request.body \ "removeDate"))

    collection.update(selector, update).map(lastError =>
      Ok("Mongo LastError: %s".format(lastError)))
  }
}
