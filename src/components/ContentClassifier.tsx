import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tag, X } from 'lucide-react';
import { Button } from './ui/button';

export interface ClassificationConfig {
  categories: string[];
  selectedCategories: string[];
}

interface ContentClassifierProps {
  config: ClassificationConfig;
  onConfigChange: (config: ClassificationConfig) => void;
}

const predefinedCategories = [
  'Notícia',
  'Blog Post',
  'Artigo Técnico',
  'Tutorial',
  'Review',
  'E-commerce',
  'Documentação',
  'Portfolio',
  'Landing Page',
  'Institucional',
  'Entretenimento',
  'Educacional',
];

export function ContentClassifier({ config, onConfigChange }: ContentClassifierProps) {
  const addCategory = (category: string) => {
    if (!config.selectedCategories.includes(category)) {
      onConfigChange({
        ...config,
        selectedCategories: [...config.selectedCategories, category],
      });
    }
  };

  const removeCategory = (category: string) => {
    onConfigChange({
      ...config,
      selectedCategories: config.selectedCategories.filter(c => c !== category),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Classificação de Conteúdo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Adicionar Categoria
          </label>
          <Select onValueChange={addCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {predefinedCategories
                .filter(cat => !config.selectedCategories.includes(cat))
                .map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Categorias Selecionadas
          </label>
          <div className="flex flex-wrap gap-2">
            {config.selectedCategories.map((category) => (
              <Badge key={category} variant="secondary" className="flex items-center gap-1">
                {category}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => removeCategory(category)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          {config.selectedCategories.length === 0 && (
            <p className="text-muted-foreground text-sm">
              Nenhuma categoria selecionada
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}