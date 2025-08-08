using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.Text;

namespace TaskManagerAPI.Core.Extension
{
    public static class BasicAuthExtensions
    {
        public static IApplicationBuilder UseBasicAuth(this IApplicationBuilder app, string username, string password)
        {
            return app.Use(async (context, next) =>
            {
                var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();

                if (authHeader != null && authHeader.StartsWith("Basic "))
                {
                    var token = authHeader["Basic ".Length..];
                    var credentialString = Encoding.UTF8.GetString(Convert.FromBase64String(token));
                    var creds = credentialString.Split(':');
                    if (creds[0] == username && creds[1] == password)
                    {
                        await next();
                        return;
                    }
                }

                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                context.Response.Headers["WWW-Authenticate"] = "Basic";
                await context.Response.WriteAsync("Unauthorized");
            });
        }
    }

}
