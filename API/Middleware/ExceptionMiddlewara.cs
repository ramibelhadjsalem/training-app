using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddlewara
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddlewara> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddlewara(RequestDelegate next, ILogger<ExceptionMiddlewara> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }
        public async Task InvokeAsync(HttpContext context ){
            try
            {
                await _next(context);

            }catch(Exception Ex)
            {
                _logger.LogError(Ex,Ex.Message);
                context.Response.ContentType="application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError ; 

                var response = _env.IsDevelopment()
                    ? new ApiException(context.Response.StatusCode,Ex.Message , Ex.StackTrace?.ToString())
                    :new ApiException(context.Response.StatusCode,"Internal Server Error") ;
                    
                    var options = new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};

                    var json = JsonSerializer.Serialize(response,options) ;
                    
                    await context.Response.WriteAsync(json);



            }
        }
    }
}