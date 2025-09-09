
"use client";

import { useState } from 'react';
import ResourceCard from "@/components/resource-card";
import type { Resource } from "@/lib/types";
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

  const handlePreview = (url: string) => {
    setPreviewUrl(url);
    setIsPreviewOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} onPreview={handlePreview} />
        ))}
      </div>
      
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
