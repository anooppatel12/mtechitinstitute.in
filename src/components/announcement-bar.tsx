
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Megaphone, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type AnnouncementBarProps = {
    text: string;
    link?: string;
}

export default function AnnouncementBar({ text, link }: AnnouncementBarProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if the user has dismissed the bar before
        const dismissed = localStorage.getItem('announcementDismissed');
        if (dismissed !== text) {
            setIsVisible(true);
        }
    }, [text]);

    const handleDismiss = () => {
        // Store the text of the dismissed announcement
        localStorage.setItem('announcementDismissed', text);
        setIsVisible(false);
    }

    if (!isVisible) {
        return null;
    }

    const Wrapper = link ? Link : 'div';
    
    return (
        <div className="bg-primary text-primary-foreground relative z-50">
            <div className="container mx-auto flex items-center justify-center p-2 text-sm">
                <Megaphone className="h-4 w-4 mr-2 flex-shrink-0" />
                 <Wrapper href={link || '#'} className={cn("text-center", link && "hover:underline")}>
                    {text}
                </Wrapper>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full ml-auto" onClick={handleDismiss}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Dismiss</span>
                </Button>
            </div>
        </div>
    );
}
