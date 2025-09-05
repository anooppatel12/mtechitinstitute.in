
"use client";

import { useState, useEffect } from 'react';
import ResourceCard from "@/components/resource-card";
import AdPlaceholder from "@/components/ad-placeholder";
import type { Resource } from "@/lib/types";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from '@/components/ui/skeleton';


export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    async function getResources() {
      try {
        const resourcesCollection = collection(db, "resources");
        const resourceSnapshot = await getDocs(resourcesCollection);
        const resourceList = resourceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Resource));
        setResources(resourceList);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    }
    getResources();
  }, []);

  const handlePreview = (url: string) => {
    setPreviewUrl(url);
    setIsPreviewOpen(true);
  };
  
  const renderSkeleton = () => (
    <div className="shadow-sm rounded-lg border bg-card">
        <div className="p-6 flex flex-row items-center gap-4">
             <Skeleton className="h-8 w-8 rounded" />
             <div className='w-full space-y-2'>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
             </div>
        </div>
        <div className="p-6 pt-0">
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="flex flex-col sm:flex-row gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    </div>
  );

  return (
    <>
      <div className="bg-background">
        <div className="container py-16 sm:py-24">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl">Student Resources</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              Access free materials to support your learning journey with us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <main className="lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {loading ? (
                          <>
                            {Array.from({ length: 4 }).map((_, i) => renderSkeleton())}
                          </>
                      ) : (
                           resources.map((resource) => (
                              <ResourceCard key={resource.id} resource={resource} onPreview={handlePreview} />
                          ))
                      )}
                  </div>
              </main>
              <aside className="lg:col-span-1 space-y-8">
                  <AdPlaceholder />
              </aside>
          </div>
        </div>
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
