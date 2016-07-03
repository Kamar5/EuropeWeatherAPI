using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WeatherApp.Models;

namespace WeatherApp.Controllers
{
    public class WeatherController : Controller
    {
        private WeatherDBEntities db = new WeatherDBEntities();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetWeather()
        {
            var weatherList = db.WeatherTables;
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var jsonResult = new ContentResult
            {
                Content = JsonConvert.SerializeObject(weatherList, camelCaseFormatter),
                ContentType = "application/json"
            };
            return jsonResult;
        }

        [HttpPost]
        public JsonResult Update([Bind(Include = "CityId,CityName,Country,Temp,Temp_max,Temp_min,Pressure,Humidity,Sunrise,Sunset,Date_Time,Longitude,Latitude,Clouds")] WeatherTable weather)
        {
            WeatherTable w = db.WeatherTables.Find(weather.CityId); //Going into database and getting the match CityId row
            if (ModelState.IsValid)
            {
                if (w == null)//If it does not find CityId then will create new row.
                {
                    db.WeatherTables.Add(weather);
                    db.SaveChanges();
                    return Json(new { success = true });
                };
                w.CityName = weather.CityName;
                w.Clouds = weather.Clouds;
                w.Country = weather.Country;
                w.Date_Time = weather.Date_Time;
                w.Humidity = weather.Humidity;
                w.Latitude = weather.Latitude;
                w.Longitude = weather.Longitude;
                w.Pressure = weather.Pressure;
                w.Sunrise = weather.Sunrise;
                w.Sunset = weather.Sunset;
                w.Temp = weather.Temp;
                w.Temp_max = weather.Temp_max;
                w.Temp_min = weather.Temp_min;
                db.Entry(w).State = EntityState.Modified;
                db.SaveChanges();
                return Json(new { success = true });
            }
            return Json(new { success = true });
        }
    }
}