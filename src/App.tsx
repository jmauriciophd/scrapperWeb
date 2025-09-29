import React, { useState } from "react";
import { URLManager } from "./components/URLManager";
import {
  DataExtractor,
  ExtractionConfig,
} from "./components/DataExtractor";
import {
  ContentClassifier,
  ClassificationConfig,
} from "./components/ContentClassifier";
import { ResultsViewer } from "./components/ResultsViewer";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [urls, setUrls] = useState<string[]>([]);
  const [extractionConfig, setExtractionConfig] =
    useState<ExtractionConfig>({
      title: true,
      imageUrl: true,
      content: true,
      description: false,
      author: false,
      publishDate: false,
    });
  const [classificationConfig, setClassificationConfig] =
    useState<ClassificationConfig>({
      categories: [],
      selectedCategories: ["Notícia"],
    });

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Web Scraper</h1>
          <p className="text-muted-foreground">
            Configure os sites para fazer scraping e extrair
            dados estruturados em formato JSON
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <URLManager urls={urls} onURLsChange={setUrls} />
            <DataExtractor
              config={extractionConfig}
              onConfigChange={setExtractionConfig}
            />
          </div>

          <div className="space-y-6">
            <ContentClassifier
              config={classificationConfig}
              onConfigChange={setClassificationConfig}
            />
          </div>
        </div>

        <ResultsViewer
          urls={urls}
          extractionConfig={extractionConfig}
          classificationConfig={classificationConfig}
        />
      </div>

      <Toaster />
    </div>
  );
}