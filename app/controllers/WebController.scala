package controllers

import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.mvc.{Action, Controller}

import scala.concurrent.Future

object WebController extends Controller {

  def main() = Action.async {
    Future { Ok(views.html.home()) }
  }

}