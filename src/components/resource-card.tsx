import type { Resource } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ClipboardList, HelpCircle, Download } from "lucide-react";

type ResourceCardProps = {
  resource: Resource;
};

const iconMap = {
    PDF: <FileText className="h-8 w-8 text-accent" />,
    Worksheet: <ClipboardList className="h-8 w-8 text-accent" />,
    Quiz: <HelpCircle className="h-8 w-8 text-accent" />
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center gap-4">
            {iconMap[resource.type]}
            <div>
                <CardTitle className="font-headline text-lg text-primary">{resource.title}</CardTitle>
                <CardDescription>{resource.type}</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-foreground/80 text-sm mb-4">{resource.description}</p>
            <Button asChild className="w-full">
                <a href={resource.fileUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </a>
            </Button>
        </CardContent>
    </Card>
  );
}
