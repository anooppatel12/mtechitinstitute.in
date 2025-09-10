
"use client";

import { useState, useMemo } from 'react';
import ResourceCard from "@/components/resource-card";
import type { Resource } from "@/lib/types";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function ResourcesClient({ resources }: { resources: Resource[] }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handlePreview = (url: string) => {
    setPreviewUrl(url);
    setIsPreviewOpen(true);
  };

  const filteredResources = useMemo(() => {
    if (!searchTerm) {
      return resources;
    }
    return resources.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [resources, searchTerm]);

  return (
    <>
      <div className="mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-base"
          />
          {searchTerm && (
              <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setSearchTerm('')}>
                  <X className="h-5 w-5" />
              </Button>
          )}
      </div>

      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} onPreview={handlePreview} />
            ))}
        </div>
      ) : (
        <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No resources found matching your search.</p>
        </div>
      )}
      
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl h-[90vh] p-0">
            <DialogHeader className="p-4 border-b">
              <DialogTitle>Resource Preview</DialogTitle>
              <DialogDescription>View the document below. You can also download it from the resource card.</DialogDescription>
            </DialogHeader>
             {previewUrl ? (
                <iframe src={previewUrl} className="w-full h-full border-0" title="Resource Preview" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p>Loading preview...</p>
                </div>
              )}
        </DialogContent>
      </Dialog>
    </>
  );
}
