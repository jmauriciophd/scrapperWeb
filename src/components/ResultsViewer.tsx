import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Copy, Check, FileJson, Play, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ExtractionConfig } from './DataExtractor';
import { ClassificationConfig } from './ContentClassifier';

interface ScrapedData {
  url: string;
  title?: string;
  imageUrl?: string;
  content?: string;
  description?: string;
  author?: string;
  publishDate?: string;
  classification: string[];
  scrapedAt: string;
}

interface ResultsViewerProps {
  urls: string[];
  extractionConfig: ExtractionConfig;
  classificationConfig: ClassificationConfig;
}

export function ResultsViewer({ urls, extractionConfig, classificationConfig }: ResultsViewerProps) {
  const [results, setResults] = useState<ScrapedData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Simular dados de scraping
  const generateMockData = (url: string): ScrapedData => {
    const mockData: ScrapedData = {
      url,
      classification: classificationConfig.selectedCategories,
      scrapedAt: new Date().toISOString(),
    };

    if (extractionConfig.title) {
      mockData.title = `Título extraído de ${new URL(url).hostname}`;
    }
    
    if (extractionConfig.imageUrl) {
      mockData.imageUrl = `https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400`;
    }
    
    if (extractionConfig.content) {
      mockData.content = `Este é o conteúdo principal extraído do site ${url}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
    }
    
    if (extractionConfig.description) {
      mockData.description = `Descrição meta do site ${new URL(url).hostname}`;
    }
    
    if (extractionConfig.author) {
      mockData.author = 'João Silva';
    }
    
    if (extractionConfig.publishDate) {
      mockData.publishDate = new Date().toISOString().split('T')[0];
    }

    return mockData;
  };

  const runScraper = async () => {
    if (urls.length === 0) {
      toast.error('Adicione pelo menos uma URL para fazer o scraping');
      return;
    }

    setIsLoading(true);
    setResults([]);

    // Simular delay de scraping
    for (let i = 0; i < urls.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData = generateMockData(urls[i]);
      setResults(prev => [...prev, mockData]);
    }

    setIsLoading(false);
    toast.success(`Scraping concluído! ${urls.length} sites processados.`);
  };

  const copyToClipboard = async () => {
    try {
      const jsonString = JSON.stringify(results, null, 2);
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      toast.success('JSON copiado para a área de transferência!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Erro ao copiar JSON');
    }
  };

  const jsonString = JSON.stringify(results, null, 2);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              Resultados do Scraping
            </div>
            <div className="flex gap-2">
              <Button onClick={runScraper} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isLoading ? 'Processando...' : 'Executar Scraping'}
              </Button>
              {results.length > 0 && (
                <Button
                  variant="outline"
                  onClick={copyToClipboard}
                  disabled={copied}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? 'Copiado!' : 'Copiar JSON'}
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Processando URLs... ({results.length}/{urls.length})
              </p>
              <div className="space-y-1">
                {results.map((result, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="truncate">{result.url}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.length > 0 && !isLoading && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {results.length} sites processados
                </Badge>
              </div>
              
              <div className="max-h-96 overflow-auto bg-muted p-4 rounded-md">
                <pre className="text-xs">
                  <code>{jsonString}</code>
                </pre>
              </div>
            </div>
          )}

          {results.length === 0 && !isLoading && (
            <p className="text-muted-foreground text-center py-8">
              Clique em "Executar Scraping" para começar
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}