using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.Extensions.Configuration;

namespace WP7AddDocumentId
{
    public class Program
    {
	    public static IConfiguration Configuration { get; set; }

		public static void Main(string[] args)
		{
			var builder = new ConfigurationBuilder()
				.SetBasePath(Directory.GetCurrentDirectory())
				.AddJsonFile("appsettings.json");

			Configuration = builder.Build();

			var mapFile = Configuration["mapFile"];
			var sourceFile = Configuration["sourceFile"];
			var targetFile = Configuration["targetFile"];

			Console.WriteLine($"sourceFile = {sourceFile}");
			Console.WriteLine($"targetFile = {targetFile}");
			Console.WriteLine();

			var imageToId = new Dictionary<string, string>();

			using (TextReader reader = File.OpenText(mapFile))
			{
				var csvReader = new CsvReader(reader);

				// Using anonymous type for the class definition
				var anonymousTypeDefinition = new
				{
					File = string.Empty,
					Document = string.Empty
				};

				var records = csvReader.GetRecords(anonymousTypeDefinition);

				foreach (var record in records)
					if (!imageToId.ContainsKey(record.File))
						imageToId.Add(record.File, record.Document);
			}

			using (TextReader reader = File.OpenText(sourceFile))
			using (TextWriter writer = File.CreateText(targetFile))
			{
				var csvReader = new CsvReader(reader, new Configuration()
				{
					HeaderValidated = null,
					MissingFieldFound = null
				});
				var csvWriter = new CsvWriter(writer);

				var records = csvReader.GetRecords<MyClass>();

				foreach (var record in records)
				{
					record.document = imageToId[record.fileName];

					csvWriter.WriteRecord(record);
					csvWriter.NextRecord();
				}
			}
		}
	}

	public class MyClass
	{
		public string seedLot { get; set; }
		public string Ref { get; set; }
		public string genotypeAlias { get; set; }
		public string scenario { get; set; }
		public string repetition { get; set; }
		public string rawPosition { get; set; }
		public string date { get; set; }
		public string plantHeight { get; set; }
		public string myDate { get; set; }
		public string day { get; set; }
		public string fileName { get; set; }
		public string document { get; set; }
	}
}
