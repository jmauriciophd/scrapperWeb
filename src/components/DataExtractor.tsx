import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Settings } from 'lucide-react';

export interface ExtractionConfig {
  title: boolean;
  imageUrl: boolean;
  content: boolean;
  description: boolean;
  author: boolean;
  publishDate: boolean;
}

interface DataExtractorProps {
  config: ExtractionConfig;
  onConfigChange: (config: ExtractionConfig) => void;
}

export function DataExtractor({ config, onConfigChange }: DataExtractorProps) {
  const updateConfig = (key: keyof ExtractionConfig, value: boolean) => {
    onConfigChange({ ...config, [key]: value });
  };

  const extractionOptions = [
    { key: 'title', label: 'Título da página', description: 'Tag title ou H1 principal' },
    { key: 'imageUrl', label: 'URL da imagem', description: 'Primeira imagem relevante encontrada' },
    { key: 'content', label: 'Conteúdo', description: 'Texto principal da página' },
    { key: 'description', label: 'Descrição', description: 'Meta description da página' },
    { key: 'author', label: 'Autor', description: 'Autor do conteúdo quando disponível' },
    { key: 'publishDate', label: 'Data de publicação', description: 'Data quando o conteúdo foi publicado' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Dados para Extrair
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {extractionOptions.map((option) => (
          <div key={option.key} className="flex items-start space-x-3">
            <Checkbox
              id={option.key}
              checked={config[option.key as keyof ExtractionConfig]}
              onCheckedChange={(checked) =>
                updateConfig(option.key as keyof ExtractionConfig, checked as boolean)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={option.key}
                className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
              <p className="text-xs text-muted-foreground">
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}