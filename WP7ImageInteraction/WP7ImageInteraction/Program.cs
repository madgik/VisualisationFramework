using System;
using System.Dynamic;
using System.Globalization;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using CsvHelper;
using Microsoft.Extensions.Configuration;

namespace WP7ImageInteraction
{
	public class Program
	{
		private static readonly HttpClient Client = new HttpClient();

		public static IConfiguration Configuration { get; set; }

		public static void Main(string[] args)
		{
			var builder = new ConfigurationBuilder()
				.SetBasePath(Directory.GetCurrentDirectory())
				.AddJsonFile("appsettings.json");

			Configuration = builder.Build();

			string api = Configuration["api"];
			string vre = Configuration["vre"];
			string imagesFolder = Configuration["imagesFolder"];
			string targetFile = Configuration["targetFile"];

			Console.WriteLine($"api = {api}");
			Console.WriteLine($"imagesFolder = {imagesFolder}");
			Console.WriteLine();

			Client.DefaultRequestHeaders.Add("gcube-scope", vre);
			Client.DefaultRequestHeaders.Add("X-Requested-With", "XMLHttpRequest");

			using (TextWriter writer = File.CreateText(targetFile))
			{
				var csvWriter = new CsvWriter(writer);

				foreach (var file in Directory.GetFiles(imagesFolder))
				{
					string fileName = new FileInfo(file).Name;

					Console.WriteLine($"Uploading file {fileName}");

					string id = PostFormData(api + "/" + "dataDocuments", fileName, File.ReadAllBytes(file))
						.GetAwaiter().GetResult();

					Console.WriteLine($"{fileName} was successfully uploaded with id: \"{id}\"");

					dynamic record = new ExpandoObject();
					record.File = fileName;
					record.Document = id;

					csvWriter.WriteRecord(record);
					csvWriter.NextRecord();

					Task.Delay(100);
				}
			}

			Console.WriteLine("Press a key...");
			Console.ReadKey();
		}

		public static async Task<String> GetConfigurationsAsync(string path)
		{
			string results = null;
			HttpResponseMessage response = await Client.GetAsync(path);
			if (response.IsSuccessStatusCode)
			{
				results = await response.Content.ReadAsStringAsync();
			}
			return results;
		}

		public static async Task<String> PostFormData(string requestUri, string name, byte[] image)
		{
			string boundary = "Upload----" + DateTime.Now.ToString(CultureInfo.InvariantCulture);
			using (var content = new MultipartFormDataContent(boundary))
			{
				content.Add(new StringContent(name), "name");
				content.Add(new StringContent("Image"), "type");
				content.Add(new StringContent("true"), "isDataReference");
				content.Add(new StreamContent(new MemoryStream(image)), "file", name);

				using (var message = await Client.PostAsync(requestUri, content))
				{
					var input = await message.Content.ReadAsStringAsync();

					return input;
				}
			}
		}
	}
}
