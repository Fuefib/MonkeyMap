import play.api._
import play.api.mvc._
import play.api.mvc.Results._
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

object Global extends GlobalSettings {

  override def onStart(app: Application) {
    Logger.info("Application has started")
  }

  override def onStop(app: Application) {
    Logger.info("Application shutdown...")
  }

  override def onHandlerNotFound(request: RequestHeader): Future[SimpleResult] = {
    Future(NotFound("Handler for [ " + request + " ] not found"))
  }

  override def onError(request: RequestHeader, ex: Throwable): Future[SimpleResult] = {
    Future(InternalServerError(ex.toString()))
  }
  
}