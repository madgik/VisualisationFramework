using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.Extensions.Configuration;

namespace WP7CSVSetup
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

			var heightFile = Configuration["heightFile"];
			var sourceFile = Configuration["sourceFile"];
			var targetFile = Configuration["targetFile"];

			Console.WriteLine($"sourceFile = {sourceFile}");
			Console.WriteLine($"targetFile = {targetFile}");
			Console.WriteLine();

			var height2Image = new Dictionary<int, string>();

			using (TextReader reader = File.OpenText(heightFile))
			{
				var csvReader = new CsvReader(reader);

				// Using anonymous type for the class definition
				var anonymousTypeDefinition = new
				{
					fileName = string.Empty,
					plantHeight = default(int)
				};

				var records = csvReader.GetRecords(anonymousTypeDefinition);

				foreach (var record in records)
					if (!height2Image.ContainsKey(record.plantHeight))
						height2Image.Add(record.plantHeight, record.fileName);
			}

			var heights = height2Image.Keys;

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
					if (!int.TryParse(record.plantHeight, out var plantHeightNumeric)) continue;

					var closest = heights.Aggregate((x, y) =>
						Math.Abs(x - plantHeightNumeric) < Math.Abs(y - plantHeightNumeric) ? x : y);

					record.fileName = height2Image[closest];

					csvWriter.WriteRecord(record);
					csvWriter.NextRecord();

					Console.WriteLine(
						$"{record.Ref} - {record.genotypeAlias} - {record.plantHeight} - {height2Image[closest]}");
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
	}
}
