import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Trash2, Plus, Globe } from 'lucide-react';

interface URLManagerProps {
  urls: string[];
  onURLsChange: (urls: string[]) => void;
}

export function URLManager({ urls, onURLsChange }: URLManagerProps) {
  const [newUrl, setNewUrl] = useState('');

  const addUrl = () => {
    if (newUrl && !urls.includes(newUrl)) {
      onURLsChange([...urls, newUrl]);
      setNewUrl('');
    }
  };

  const removeUrl = (index: number) => {
    onURLsChange(urls.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addUrl();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          URLs dos Sites
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="https://exemplo.com"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={addUrl} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2 max-h-40 overflow-y-auto">
          {urls.map((url, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-muted rounded-md"
            >
              <span className="truncate text-sm">{url}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeUrl(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {urls.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-4">
            Nenhuma URL adicionada ainda
          </p>
        )}
      </CardContent>
    </Card>
  );
}